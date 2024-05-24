import { formatDistanceToNowStrict } from "date-fns"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import UserImage from "../assets/Img/github.gif"

export default function Conversation({
  friend,
  setMessages,
  isBot = false,
  setCurrentChat,
  conversations,
}) {
  const onlineUsers = useSelector((state) => state.onlineUsers)
  const token = useSelector((state) => state.token)

  let timeStamp
  if (!isBot) {
    timeStamp = formatDistanceToNowStrict(friend?.lastOnline)
  }

  useEffect(() => {
    const getMessages = async () => {
      try {
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
          console.log("Setting conversation of the bot inside Conversation")
          console.log(conversations)
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
            isBot
              ? UserImage
              : `${import.meta.env.VITE_BASE_URL}/assets/${friend?.picturePath}`
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
