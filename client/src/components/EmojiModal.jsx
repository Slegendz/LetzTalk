import React, { useState, useRef, useEffect } from "react"
import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import { RiEmojiStickerLine } from "react-icons/ri"

const EmojiModal = ({ windowSize, newMessage, setNewMessage, textAreaRef }) => {
  const [emojiModal, setEmojiModal] = useState(false)
  const emojiRef = useRef()
  const [emojiLine, setEmojiLine] = useState(8);

  useEffect(() => {
    if(windowSize.width < 768){
      setEmojiLine(6);
    } else {
      setEmojiLine(8);
    }
  }, [windowSize.width])

  useEffect(() => {
    const handleClick = (e) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setEmojiModal(false)
      }
    }

    document.addEventListener("click", handleClick)

    return () => document.removeEventListener("click", handleClick)
  }, [emojiModal])

  const handleEmojiPick = (emoji) => {
    const pickedEmoji = emoji.native;

    setNewMessage(newMessage + pickedEmoji);
    textAreaRef.current?.focus();
  }

  return (
    <div ref={emojiRef} className="transition-all relative duration-500">
      <RiEmojiStickerLine
        className="h-[30px] w-[30px] cursor-pointer"
        onClick={() => setEmojiModal(!emojiModal)}
      />

      {emojiModal && (
        <div className="absolute -left-[50px] lg:left-[50%] lg:translate-x-[-50%] bottom-[50px]">
          <Picker perLine = {emojiLine} emojiSize = {24} emojiButtonSize = {32} data={data} onEmojiSelect={handleEmojiPick} />
        </div>
      )}
    </div>
  )
}

export default EmojiModal
