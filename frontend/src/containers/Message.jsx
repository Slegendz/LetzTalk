import UserImage from "../assets/Img/github.gif"
import { formatDistanceToNowStrict } from "date-fns"
import React from "react"

const Message = ({ own, message, currFriend, user, isBot = false }) =>  {
  const lastOnlineTime = formatDistanceToNowStrict(message.createdAt).split(" ")
  const timeStamp = lastOnlineTime[0] + lastOnlineTime[1][0]

  return (
    <div
      className={`${own ? "justify-end" : "justify-start"} my-1 flex items-start gap-2 xs:my-2 xs:gap-4 xs:px-4 `}
    >
      {!own && (
        <div className="h-[30px] w-[30px]">
          <img
            className="h-full w-full rounded-full object-cover object-center"
            src = {isBot ? UserImage : `${process.env.REACT_APP_BASE_URL}/assets/${currFriend.picturePath}`}
            alt="UserImage"
          />
        </div>
      )}

      <div
        className={`${own ? "bg-cyan-400 bg-opacity-70" : "bg-rose-400 bg-opacity-70"} text-[15px] leading-6 xs:text-base px-2 py-2 flex  max-w-[220px] gap-2 rounded-lg xs:max-w-[70%] xs:gap-4 2xl:max-w-[800px] `}
      >
        <p
          className={` wrapWord flex flex-1`}
        >
          {message.text}
        </p>
        <p
          className={`-mb-[5px] flex items-end justify-end text-[12px]`}
        >
          {timeStamp}
        </p>
      </div>

      {own && (
        <div className="h-[30px] w-[30px]">
          <img
            className="h-full w-full rounded-full object-cover object-center"
            src={`${process.env.REACT_APP_BASE_URL}/assets/${user.picturePath}`}
            alt="UserImage"
          />
        </div>
      )}
    </div>
  )
}

export default Message;