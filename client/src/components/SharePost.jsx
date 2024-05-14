import React, { useRef, useState } from "react"
import {
  EmailShare,
  FacebookShare,
  LinkedinShare,
  WhatsappShare,
  TwitterShare,
} from "react-share-kit"
import { FaShareAlt } from "react-icons/fa"

const SharePost = ({ postId, name }) => {
  const [isShare, setIsShare] = useState(false)

  // For sharing url to friends
  const titleToShare = `Check out this amazing post by ${name}: `
  // const urlToShare = `http://localhost:5173/posts/${postId}`
  const urlToShare =
    "https://th.bing.com/th/id/OIP.yOoOlRkcBZmpRfP3AlPD4QHaEo?rs=1&pid=ImgDetMain"

  // Ref to the share
  const shareRef = useRef()

  const handleClick = (e) => {
    if (shareRef.current && !shareRef.current.contains(e.target)) {
      setIsShare(false)
    }
  }
  document.addEventListener("mousedown", handleClick)

  return (
    <div className="relative transition-all duration-1000" ref={shareRef}>
      <button
        onClick={() => setIsShare(!isShare)}
        className="relative p-2 before:absolute before:inset-1 before:block before:rounded-full before:blur-md hover:text-blue-400 hover:before:bg-blue-400"
      >
        <FaShareAlt />
      </button>

      {/* To share the post with other users */}

      {isShare && (
        <div
          className="animate__animated animate__fadeIn absolute bottom-[40px] left-[50%] flex translate-x-[-50%] gap-3 rounded-2xl bg-gray-200 px-4 py-2 before:absolute before:inset-0 before:-z-10 before:h-full before:w-full before:bg-teal-300 before:bg-opacity-40 before:px-4 before:py-2 before:blur-md before:content-[''] after:absolute
            after:left-[50%] after:top-[48px] after:h-[0px] after:w-[0px] after:translate-x-[-50%] after:border-l-[5px] after:border-r-[5px]
            after:border-t-[8px] after:border-l-transparent after:border-r-transparent after:border-t-teal-400 after:border-opacity-25 after:content-[''] dark:bg-gray-700
            "
        >
          <TwitterShare
            size={32}
            round={true}
            url={urlToShare}
            title={titleToShare}
            blankTarget={true}
          />
          <WhatsappShare
            size={32}
            round={true}
            url={urlToShare}
            title={titleToShare}
            blankTarget={true}
          />
          <LinkedinShare
            size={32}
            round={true}
            url={urlToShare}
            title={titleToShare}
            blankTarget={true}
          />
          <EmailShare
            size={32}
            round={true}
            url={urlToShare}
            title={titleToShare}
            blankTarget={true}
          />
          <FacebookShare
            size={32}
            round={true}
            url={urlToShare}
            title={titleToShare}
            blankTarget={true}
          />
        </div>
      )}
    </div>
  )
}

export default SharePost
