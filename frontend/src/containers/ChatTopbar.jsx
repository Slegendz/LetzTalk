import { formatDistanceToNowStrict } from "date-fns"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { MdCall } from "react-icons/md"
import { FaVideo } from "react-icons/fa6"
import UserImage from "../assets/Img/github.gif"
import React from "react"

export default function ChatTopbar({ currFriend, isBot = false }) {
  const onlineUsers = useSelector((state) => state.onlineUsers)

  let lastOnlineTime, timeStamp

  if (!isBot) {
    lastOnlineTime = formatDistanceToNowStrict(currFriend.lastOnline).split(" ")
    timeStamp = lastOnlineTime[0] + lastOnlineTime[1][0]
  }

  return (
    <div className="flex h-full w-full items-center justify-between px-2 py-2 xs:px-6 xs:py-2">
      <div className="flex h-full w-full items-center justify-start gap-2 xs:gap-4">
        {!isBot && (
          <Link to={`/profile/${currFriend?._id}`}>
            <div className="relative h-[40px] w-[40px] cursor-pointer xs:h-[45px] xs:w-[45px]">
              <img
                src={`${process.env.REACT_BASE_URL}/assets/${currFriend?.picturePath}`}
                className="h-full w-full rounded-full object-cover object-center"
                alt="FriendPic"
              />

              {onlineUsers.includes(currFriend?._id) && (
                <div className="absolute bottom-0 right-0 h-[15px]  w-[15px] rounded-full border-[2px] border-white bg-green-500 dark:border-black"></div>
              )}
            </div>
          </Link>
        )}

        {isBot && (
          <div className="relative h-[40px] w-[40px] cursor-pointer xs:h-[45px] xs:w-[45px]">
            <img
              src={UserImage}
              className="h-full w-full rounded-full object-cover object-center"
              alt="BotPic"
            />

            {(isBot || onlineUsers.includes(currFriend?._id)) && (
              <div className="absolute bottom-0 right-0 h-[15px]  w-[15px] rounded-full border-[2px] border-white bg-green-500 dark:border-black"></div>
            )}
          </div>
        )}

        <div className="text-md flex cursor-pointer flex-col justify-center text-nowrap">
          {!isBot && (
            <Link to={`/profile/${currFriend?._id}`}>
              <p className="text-base xs:text-lg">
                {`${currFriend?.firstName} ${currFriend?.lastName}`}
              </p>
              <p className="text-sm">
                {!onlineUsers.includes(currFriend?._id)
                  ? `Active ${timeStamp} ago `
                  : "Active Now"}
              </p>
            </Link>
          )}

          {isBot && (
            <div>
              <p className="text-base xs:text-lg">
                {isBot
                  ? "LetzTalk"
                  : `${currFriend?.firstName} ${currFriend?.lastName}`}
              </p>
              <p className="text-sm">
                {isBot
                  ? "Talk with Bot"
                  : !onlineUsers.includes(currFriend?._id)
                    ? `Active ${timeStamp} ago `
                    : "Active Now"}
              </p>
            </div>
          )}
        </div>
      </div>

      {!isBot && (
        <div className="flex items-center justify-center gap-2 text-2xl xs:gap-4">
          <div className="flex h-[40px] w-[40px] rounded-full transition-all duration-500 hover:bg-slate-300 hover:text-black xs:h-[45px] xs:w-[45px] dark:hover:bg-[#ffffff6c] dark:hover:text-white">
            <MdCall className="h-full w-full p-2" />
          </div>

          <div className="flex h-[40px] w-[40px] rounded-full transition-all duration-500 hover:bg-slate-300 hover:text-black xs:h-[45px] xs:w-[45px] dark:hover:bg-[#ffffff6c] dark:hover:text-white">
            <FaVideo className="h-full w-full p-2" />
          </div>
        </div>
      )}
    </div>
  )
}
