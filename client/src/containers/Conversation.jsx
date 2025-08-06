import { formatDistanceToNowStrict } from "date-fns"
import { useEffect } from "react"
import UserImage from "../assets/Img/github.gif"
import React from "react"
import { setUserMessages } from "../redux/authSlice.jsx"
import { useSelector, useDispatch } from "react-redux"

const Conversation = ({
  friend,
  setMessages,
  isBot = false,
  setCurrentChat,
  conversations,
}) => {
  const onlineUsers = useSelector((state) => state.onlineUsers)
  const token = useSelector((state) => state.token)

  const dispatch = useDispatch()
  const userMessage = useSelector((state) => state.messages)

  let timeStamp = ""
  if (friend?.lastOnline && !isBot) {
    timeStamp = formatDistanceToNowStrict(friend.lastOnline)
  }

  useEffect(() => {
    const getMessages = async () => {
      try {
        if (!userMessage[conversations._id]) {
          const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/messages/${conversations._id}`,
            {
              method: "GET",
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          const data = await response.json()

          if (response.ok) {
            setMessages(data)
            setCurrentChat(conversations)
            dispatch(
              setUserMessages({
                ...userMessage,
                [conversations._id]: data,
              })
            )
          }
        } else {
          setMessages(userMessage[conversations._id])
          setCurrentChat(conversations)
        }
      } catch (err) {
        console.log(err)
      }
    }

    if (conversations) {
      getMessages()
    }
  }, [conversations])

  return (
    <div className="flex w-full cursor-pointer justify-center gap-4 px-2 py-2 hover:bg-gray-500 hover:bg-opacity-10 xs:px-4 xs:py-4 lg:justify-start dark:hover:bg-opacity-15">
      <div className="relative h-[50px] w-[50px] xs:h-[55px] xs:w-[55px]">
        <img
          src={
            isBot ? UserImage : friend?.picturePath
            // : `${import.meta.env.VITE_BASE_URL}/assets/${friend?.picturePath}`
          }
          className="h-full w-full rounded-full object-cover object-center"
          alt="FriendPic"
        />

        {(isBot || onlineUsers.includes(friend?._id)) && (
          <div className="absolute bottom-0 right-0 h-[15px]  w-[15px] rounded-full border-[2px] border-white bg-green-500 dark:border-black"></div>
        )}
      </div>

      <div className="text-md hidden flex-col justify-center lg:flex">
        <div>
          <p className="text-lg">
            {isBot ? "LetzTalk" : `${friend?.firstName} ${friend?.lastName}`}
          </p>
        </div>
        <div>
          <p className="text-sm">
            {isBot
              ? "Talk with Bot"
              : !onlineUsers.includes(friend?._id)
                ? `Active ${timeStamp} ago `
                : "Active Now"}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Conversation;