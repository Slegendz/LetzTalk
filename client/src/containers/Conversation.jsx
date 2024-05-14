import { formatDistanceToNowStrict } from "date-fns"
import { useEffect } from "react"
import { useSelector } from "react-redux"

export default function Conversation({
  friend,
  setMessages,
  setCurrentChat,
  conversations,
}) {
  const onlineUsers = useSelector((state) => state.onlineUsers)
  const timeStamp = formatDistanceToNowStrict(friend.lastOnline)
  // const user = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)

  // useEffect(() => {
  //   const getConversations = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:3001/conversations/find/${user._id}/${friend._id}`,
  //         {
  //           method: "GET",
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       )
  //       const data = await response.json()
  //       setConversations(data)
  //       // console.log(data)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  //   getConversations()
  // }, [currFriend])

  // useEffect(() => {
  //   const getMessages = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:3001/messages/${conversations._id}`,
  //         {
  //           method: "GET",
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       )
  //       const data = await response.json()
  //       // console.log(data)
  //       setMessages(data)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  //   getMessages()
  // }, [currentChat])

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/messages/${conversations._id}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        const data = await response.json()

        if (response.ok) {
          setMessages(data)
          console.log(data)

          setCurrentChat(conversations)
        }
      } catch (err) {
        console.log(err)
      }
    }

    if (conversations) {
      getMessages()
    }
    console.log(conversations)
  }, [conversations])

  return (
    <div className="flex w-full cursor-pointer justify-center gap-4 px-2 py-2 hover:bg-gray-500 hover:bg-opacity-10 xs:px-4 xs:py-4 lg:justify-start dark:hover:bg-opacity-15">
      <div className="relative h-[50px] w-[50px] xs:h-[55px] xs:w-[55px]">
        <img
          src={`http://localhost:3001/assets/${friend.picturePath}`}
          className="h-full w-full rounded-full object-cover object-center"
          alt="FriendPic"
        />

        {onlineUsers.includes(friend._id) && (
          <div className="absolute bottom-0 right-0 h-[15px]  w-[15px] rounded-full border-[2px] border-white bg-green-500 dark:border-black"></div>
        )}
      </div>

      <div className="text-md hidden flex-col justify-center lg:flex">
        <div>
          <p className="text-lg">
            {" "}
            {friend.firstName + " " + friend.lastName}{" "}
          </p>
        </div>
        <div>
          <p className="text-sm">
            {!onlineUsers.includes(friend._id)
              ? `Active ${timeStamp} ago `
              : "Active Now"}
          </p>
        </div>
      </div>
    </div>
  )
}
