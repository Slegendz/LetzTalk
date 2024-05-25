import React from "react"
import UserImage from "../assets/Img/github.gif"

const TypingMessage = ({
  message,
  currFriend,
  isBot = false,
}) => {
  return (
    <div
      className={`my-1 flex items-start justify-start gap-2 xs:my-2 xs:gap-4 xs:px-4 `}
    >
      <div className="h-[30px] w-[30px]">
        <img
          className="h-full w-full rounded-full object-cover object-center"
          src={
            isBot
              ? UserImage
              : `${process.env.REACT_APP_BASE_URL}/assets/${currFriend.picturePath}`
          }
          alt="UserImage"
        />
      </div>

      <div
        className={`flex max-w-[220px] gap-2 rounded-lg bg-rose-400  bg-transparent bg-opacity-70 p-0 xs:max-w-[70%] xs:gap-4 2xl:max-w-[800px] `}
      >
        <p className={`wrapWord flex flex-1 animate-pulse text-lg`}>
          {message.text}
        </p>
      </div>
    </div>
  )
}

export default TypingMessage
