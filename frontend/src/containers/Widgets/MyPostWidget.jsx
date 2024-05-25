import UserImage from "../../components/UserImage"
import { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPosts } from "../../redux/authSlice"
import { FaRegImage } from "react-icons/fa6"
import { MdAudiotrack } from "react-icons/md"
import { FaPaperclip } from "react-icons/fa"
import React from "react"

const MyPostWidget = ({ picturePath, isProfile = false }) => {
  const dispatch = useDispatch()
  const [isImage, setIsImage] = useState(false)
  const [isClip, setIsClip] = useState(false)
  const [isAudio, setIsAudio] = useState(false)

  const [image, setImage] = useState(null)
  const [clip, setClip] = useState(null)
  const [audio, setAudio] = useState(null)

  const [post, setPost] = useState("")
  const { _id } = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)

  const myPostRef = useRef()

  const handlePost = async () => {
    const formData = new FormData()
    formData.append("userId", _id)
    formData.append("description", post)

    if (image) {
      formData.append("picture", image)
      formData.append("picturePath", image.name)
    }

    if (clip) {
      formData.append("clip", clip)
      formData.append("clipPath", clip.name)
    }

    if (audio) {
      formData.append("audio", audio)
      formData.append("audioPath", audio.name)
    }

    if (!isProfile) {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/posts`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })
      const posts = await response.json()
      dispatch(setPosts({ posts }))
    } else {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/posts/profile`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      )
      const posts = await response.json()
      dispatch(setPosts({ posts }))
    }

    setImage(null)
    setIsImage(false)

    setClip(null)
    setIsClip(false)

    setAudio(null)
    setIsAudio(false)

    setPost("")
  }

  useEffect(() => {
    const handleClick = (e) => {
      if (myPostRef.current && !myPostRef.current.contains(e.target)) {
        setIsImage(false)
      }
    }
    document.addEventListener("mousedown", handleClick)

    return () => {
      document.removeEventListener("mousedown", handleClick)
    }
  }, [myPostRef])

  return (
    <div
      ref={myPostRef}
      className="my-2 rounded-xl bg-white p-4 drop-shadow-lg md:m-2 lg:mt-0 dark:bg-[#282828]"
    >
      <div className="flex items-center gap-4">
        <div className="hidden xss:block">
          <UserImage image={picturePath} />
        </div>
        <input
          className="overflow-none flex w-full flex-1 resize-none rounded-3xl bg-gray-100 p-3 px-4 text-gray-700 outline-none"
          placeholder="What's on your mind..."
          value={post}
          rows={1}
          onChange={(e) => setPost(e.target.value)}
        />
      </div>

      {isImage && (
        <div className="mt-4 p-4">
          <label
            htmlFor="file-upload"
            className="flex min-w-[200px] cursor-pointer rounded-lg bg-grey-800 p-4 px-4 text-base font-semibold text-white outline-none focus-within:outline-none hover:text-slate-200 dark:bg-white dark:text-indigo-600 hover:dark:text-indigo-500"
          >
            <input
              id="file-upload"
              className="sr-only"
              name="file-upload"
              type="file"
              accept=".png, .jpg, .jpeg, .gif"
              onChange={(e) => {
                setImage(e.target.files[0])
              }}
            />
            <span className="flex w-full md:items-center md:justify-center">
              {!image
                ? "Upload a file ( PNG, JPG, GIF )"
                : image.name.length > 40
                  ? image.name.substring(0, 40) + "..."
                  : image.name}
            </span>
          </label>
        </div>
      )}

      {isAudio && (
        <div className="mt-4 p-4">
          <label
            htmlFor="file-upload"
            className="flex min-w-[200px] cursor-pointer rounded-lg bg-grey-800 p-4 px-4 text-base font-semibold text-white outline-none focus-within:outline-none hover:text-slate-200 dark:bg-white dark:text-indigo-600 hover:dark:text-indigo-500"
          >
            <input
              id="file-upload"
              className="sr-only"
              name="file-upload"
              type="file"
              accept=".mp3"
              onChange={(e) => {
                setAudio(e.target.files[0])
              }}
            />
            <span className="flex w-full md:items-center md:justify-center">
              {!audio
                ? "Upload a file ( Mp3, Audio File)"
                : audio.name.length > 40
                  ? audio.name.substring(0, 40) + "..."
                  : audio.name}
            </span>
          </label>
        </div>
      )}

      {isClip && (
        <div className="mt-4 p-4">
          <label
            htmlFor="file-upload"
            className="flex min-w-[200px] cursor-pointer rounded-lg bg-grey-800 p-4 px-4 text-base font-semibold text-white outline-none focus-within:outline-none hover:text-slate-200 dark:bg-white dark:text-indigo-600 hover:dark:text-indigo-500"
          >
            <input
              id="file-upload"
              className="sr-only"
              name="file-upload"
              type="file"
              accept=".mp4 , .mkv"
              onChange={(e) => {
                setClip(e.target.files[0])
              }}
            />
            <span className="flex w-full md:items-center md:justify-center">
              {!clip
                ? "Upload a file ( MP4, mkv )"
                : clip.name.length > 40
                  ? clip.name.substring(0, 40) + "..."
                  : clip.name}
            </span>
          </label>
        </div>
      )}

      <div className="m-5 h-[1px] bg-zinc-100 dark:bg-[#121212]"></div>

      <div className="flex items-center justify-around gap-4">
        <div
          className="flex items-center gap-2"
          onClick={() => {
            setIsImage(!isImage)
            setIsClip(false)
            setIsAudio(false)
          }}
        >
          <FaRegImage />
          <p className="cursor-pointer hover:text-blue-400"> Image </p>
        </div>

        <div
          className="hidden items-center gap-2 xss:flex"
          onClick={() => {
            setIsImage(false)
            setIsClip(!isClip)
            setIsAudio(false)
          }}
        >
          <FaPaperclip />
          <p className="cursor-pointer hover:text-blue-400">Clip</p>
        </div>

        <div
          className="hidden items-center gap-2 sm:flex"
          onClick={() => {
            setIsImage(false)
            setIsClip(false)
            setIsAudio(!isAudio)
          }}
        >
          <MdAudiotrack />
          <p className="cursor-pointer hover:text-blue-400">Audio</p>
        </div>

        <button
          disabled={!post}
          onClick={handlePost}
          className="rounded-[30px] bg-blue-400 p-2 px-6 text-white hover:bg-blue-300"
        >
          Post
        </button>
      </div>
    </div>
  )
}

export default MyPostWidget
