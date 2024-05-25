import React, { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Conversation from "./Conversation"
import Sidebar from "../components/Sidebar"
import { AiOutlineMessage } from "react-icons/ai"
import { socket } from "../utils/SocketConn.js"
import ChatTopbar from "./ChatTopbar.jsx"
import { useAutosizeTextArea } from "../hooks/useAutosizeTextArea.js"
import { setFriends } from "../redux/authSlice.jsx"
import EmojiModal from "../components/EmojiModal.jsx"
import Message from "./Message.jsx"
import TypingMessage from "./TypingMessage.jsx"

export default function Messenger({ logoutUser, windowSize }) {
  const [conversations, setConversations] = useState(null)
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const [currFriend, setCurrFriend] = useState([])

  const [isTyping, setIsTyping] = useState(false)

  const user = useSelector((state) => state.user)
  const friends = useSelector((state) => state.user.friends)
  const token = useSelector((state) => state.token)
  const { _id, picturePath } = useSelector((state) => state.user)

  const [botConversation, setBotConversation] = useState(false)
  const [botReply, setBotReply] = useState(false)
  const [botReplyMsg, setBotReplyMsg] = useState(false)

  const scrollRef = useRef()
  const typingScrollRef = useRef()
  const dispatch = useDispatch()
  const textAreaRef = useRef()

  const LANGUAGE_MODEL_API_KEY = process.env.REACT_APP_LANGUAGE_MODEL_KEY
  const LANGUAGE_MODEL_URL = `https://generativelanguage.googleapis.com/v1beta1/models/chat-bison-001:generateMessage?key=${LANGUAGE_MODEL_API_KEY}`
  const botId = process.env.REACT_APP_BOT_ID

  useAutosizeTextArea(textAreaRef.current, newMessage)
  let activityTimer

  useEffect(() => {
    socket.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: new Date().toISOString(),
      })
    })

    socket.on("userActivity", () => {
      setIsTyping(true)

      clearTimeout(activityTimer)
      activityTimer = setTimeout(() => {
        setIsTyping(false)
      }, 2000)
    })
  }, [])

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.keyCode == 13 && !e.shiftKey) {
        handleSubmit(e)
      }
    }

    if (newMessage.length > 0) {
      const receiverId = currFriend?._id
      socket.emit("activity", receiverId)
    } else {
      setIsTyping(false)
    }

    document.addEventListener("keydown", handleKeyPress)
    return () => {
      document.removeEventListener("keydown", handleKeyPress)
    }
  }, [newMessage])

  useEffect(() => {
    if (
      arrivalMessage &&
      conversations?.members.includes(arrivalMessage.sender)
    ) {
      setMessages((prev) => [...prev, arrivalMessage])
    }
  }, [arrivalMessage])

  useEffect(() => {
    const botMessage = async () => {
      if (newMessage !== "") {
        setBotReplyMsg(true)

        const payload = {
          prompt: { messages: [{ content: newMessage }] },
          temperature: 0.1,
          candidate_count: 1,
        }
        setNewMessage("")

        try {
          const response = await fetch(LANGUAGE_MODEL_URL, {
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
            method: "POST",
          })
          const data = await response.json()

          const message = {
            conversationId: conversations,
            senderId: botId,
            text: data.candidates[0].content,
            createdAt: new Date(),
          }

          if (response.ok) {
            setMessages([...messages, message])
            setBotReplyMsg(false)
          }

          try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/messages`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(message),
            })

            if (!response.ok) {
              setMessages(messages)
            }
          } catch (err) {
            console.log(err)
          }
        } catch (err) {
          console.log(err.message)
        }
      }
    }
    botMessage()
    setBotReply(false)
  }, [botReply])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const message = {
      conversationId: conversations,
      senderId: user._id,
      text: newMessage,
    }

    if (!botConversation) {
      const receiverId = currFriend._id

      socket.emit("sendMessage", {
        senderId: user._id,
        receiverId,
        text: newMessage,
      })
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      })
      const data = await response.json()

      if (response.ok) {
        setMessages([...messages, data])
      }

      if (botConversation) {
        setBotReply(true)
      } else {
        setNewMessage("")
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getFriendConversation = async (friend, isBot) => {
    try {
      const response = isBot
        ? await fetch(
            `${process.env.REACT_APP_BASE_URL}/conversations/find/${user._id}/${botId}`,
            {
              method: "GET",
              headers: { Authorization: `Bearer ${token}` },
            }
          )
        : await fetch(
            `${process.env.REACT_APP_BASE_URL}/conversations/find/${user._id}/${friend._id}`,
            {
              method: "GET",
              headers: { Authorization: `Bearer ${token}` },
            }
          )

      const data = await response.json()
      setConversations(data)

      if (isBot) {
        setBotConversation(true)
      } else {
        setCurrFriend(friend)
        setBotConversation(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView()
  }, [messages, isTyping, botReplyMsg])

  return (
    <div className="flex h-full w-full overflow-hidden bg-white text-gray-700 dark:bg-black dark:text-gray-300">
      <Sidebar logoutUser={logoutUser} _id={_id} picturePath={picturePath} />

      <div className="mb-[60px] flex flex-1 bg-zinc-100 md:mb-0 md:ml-[70px] dark:bg-black">
        <div className="flex w-[80px] flex-col border-r-[1.5px]  border-r-gray-600 border-opacity-30 pt-4 xs:w-[100px] lg:w-[28%] md:dark:border-r-gray-600 md:dark:border-opacity-60">
          <div className="hidden px-2 lg:block">
            <input
              name="search-bar"
              id="searc3h-bar"
              placeholder="Search for friends..."
              className="mb-4 w-full rounded-3xl px-4 py-3 text-black shadow-lg outline-none"
            />
          </div>

          <div className="h-full w-full overflow-auto">
            <div
              onClick={() => {
                getFriendConversation(currFriend, true)
              }}
            >
              <Conversation
                conversations={conversations}
                setCurrentChat={setCurrentChat}
                setMessages={setMessages}
                isBot
              />
            </div>

            {friends.map((friend, idx) => (
              <div
                key={idx}
                onClick={() => {
                  getFriendConversation(friend, false)
                }}
              >
                <Conversation
                  conversations={conversations}
                  setCurrentChat={setCurrentChat}
                  setMessages={setMessages}
                  friend={friend}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="h-full w-full lg:w-[72%]">
          {currentChat ? (
            <div className="flex h-full flex-col">
              <div className="h-[75px] border-b border-gray-500 border-opacity-40">
                <ChatTopbar currFriend={currFriend} isBot={botConversation} />
              </div>

              <div className="flex h-0 flex-grow flex-col overflow-auto p-2 xs:p-4">
                {messages.map((m, idx) => (
                  <div key={idx} ref={scrollRef}>
                    <Message
                      own={m.senderId === user._id}
                      message={m}
                      user={user}
                      currFriend={currFriend}
                      isBot={botConversation}
                    />
                  </div>
                ))}

                {(isTyping || botReplyMsg) && (
                  <TypingMessage
                    isBot={botConversation}
                    message={{
                      text: "Typing...",
                      createdAt: new Date().toISOString(),
                    }}
                    currFriend={currFriend}
                  />
                )}
              </div>

              <div className="relative m-2 flex min-h-[50px] items-center gap-2 rounded-[25px] border border-r-2 border-gray-400 px-2 sm:m-4 sm:px-4">
                <EmojiModal
                  windowSize={windowSize}
                  newMessage={newMessage}
                  setNewMessage={setNewMessage}
                  textAreaRef={textAreaRef}
                />
                <textarea
                  ref={textAreaRef}
                  className="max-h-[125px] w-full flex-1 resize-none bg-red-400 bg-transparent px-2 py-[2px] text-[14px] leading-5 outline-none xss:text-[16px] sm:text-[18px]"
                  placeholder="Message..."
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                  rows={1}
                ></textarea>
                <button
                  className="flex text-blue-400 hover:text-white"
                  onClick={(e) => handleSubmit(e)}
                >
                  Send
                </button>
              </div>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-4">
              <AiOutlineMessage className="text-7xl text-black  sm:text-8xl dark:text-white" />
              <p className=" text-sm xss:text-lg md:text-xl">
                Send a Message to start a chat
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
