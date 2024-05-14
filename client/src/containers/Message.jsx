import UserImage from "../assets/Img/github.gif"
import { formatDistanceToNowStrict } from "date-fns"

export default function Message({ message, own }) {
  const lastOnlineTime = formatDistanceToNowStrict(message.createdAt).split(" ")
  const timeStamp = lastOnlineTime[0] + lastOnlineTime[1][0]

  return (
    <div
      className={`${own ? "justify-end" : "justify-start"} my-1 flex items-start gap-2 xs:my-2 xs:gap-4 xs:px-4 `}
    >
      {!own && (
        <div className="h-[30px] w-[30px] object-cover object-center">
          <img
            className="h-full w-full rounded-full"
            src={UserImage}
            alt="UserImage"
          />
        </div>
      )}
      
      <div className={`${own ? "bg-cyan-400 bg-opacity-70" : "bg-rose-400 bg-opacity-70"} flex  max-w-[220px] xs:max-w-[70%] 2xl:max-w-[800px] rounded-lg gap-2 px-2 py-2 xs:gap-4 `}>
          <p className="wrapWord flex flex-1">{message.text}</p>
          <p className="flex justify-end items-end text-[12px] -mb-[5px]"> {timeStamp} </p>
      </div>

      {own && (
        <div className="h-[30px] w-[30px] object-cover object-center">
          <img
            className="h-full w-full rounded-full"
            src={UserImage}
            alt="UserImage"
          />
        </div>
      )}
    </div>
  )
}
