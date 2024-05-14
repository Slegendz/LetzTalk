import UserImage from "../../components/UserImage"
import { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPosts } from "../../redux/authSlice"
import { FaRegImage } from "react-icons/fa6"
import { MdAudiotrack } from "react-icons/md"
import { FaPaperclip } from "react-icons/fa"

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch()
  const [isImage, setIsImage] = useState(false)
  const [image, setImage] = useState(null)
  const [post, setPost] = useState("")
  const { _id } = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)

  const myPostRef = useRef();

  const handlePost = async () => {
    const formData = new FormData()
    formData.append("userId", _id)
    formData.append("description", post)
    if (image) {
      formData.append("picture", image)
      formData.append("picturePath", image.name)
    }

    const response = await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
    const posts = await response.json()
    dispatch(setPosts({ posts }))
    setImage(null)
    setIsImage(false)
    setPost("")
  } 

  const handleClick = (e) => {
    if (myPostRef.current && !myPostRef.current.contains(e.target)) {
      setIsImage(false)
    }
  }

  document.addEventListener("mousedown", handleClick);

  return (
    <div ref = {myPostRef} className="my-2 rounded-xl bg-white p-4 drop-shadow-lg md:m-2 lg:mt-0 dark:bg-[#282828]">
      <div className="flex items-center gap-4">
        <div className = "hidden xss:block">
          <UserImage image={picturePath} />
        </div>
        <input
          className="flex resize-none w-full overflow-none flex-1 rounded-3xl bg-gray-100 p-3 px-4 text-gray-700 outline-none"
          placeholder="What's on your mind..."
          value={post}
          rows = {1}
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

      <div className="m-5 h-[1px] bg-zinc-100 dark:bg-[#121212]"></div>

      <div className="flex items-center justify-around gap-4">
        <div
          className="flex items-center gap-2"
          onClick={() => setIsImage(!isImage)}
        >
          <FaRegImage />
          <p className="cursor-pointer hover:text-blue-400"> Image </p>
        </div>

        <div className="xss:flex hidden items-center gap-2">
          <FaPaperclip />
          <p className="cursor-pointer hover:text-blue-400">Clip</p>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
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
