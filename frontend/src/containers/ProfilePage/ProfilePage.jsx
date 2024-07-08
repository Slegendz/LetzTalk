import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import FriendListWidget from "../Widgets/FriendWidget"
import MyPostWidget from "../Widgets/MyPostWidget"
import PostsWidget from "../Widgets/PostsWidget"
import UserWidget from "../Widgets/UserWidget"
import CoverImg from "../../assets/Img/coverImg.jpg"
import React from "react"
import { TbPhotoEdit } from "react-icons/tb"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const ProfilePage = ({ logoutUser }) => {
  const loggedInUser = useSelector((state) => state.user)
  const [user, setUser] = useState(null)
  const [blurEffect, setBlurEffect] = useState(false)

  const { userId } = useParams()
  const token = useSelector((state) => state.token)

  const getUser = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/users/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    const data = await response.json()
    setUser(data)
  }

  const updateUser = async (formData) => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/users/updateUser`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    )
    const updatedUser = await response.json()

    if (response.ok) {
      setUser(updatedUser)
      toast.success("Cover Image Updated", {
        position: "top-right",
        autoClose: 3000,
        newestOnTop: true,
        theme: "light",
        hideProgressBar: false,
      })
    } else {
      toast.error(`${updatedUser.message}`, {
        position: "top-right",
        autoClose: 3000,
        newestOnTop: true,
        theme: "light",
        hideProgressBar: false,
      })
    }
    setBlurEffect(false)
  }

  const updateCoverImage = (e) => {
    if (user) {
      setBlurEffect(true)
      const formData = new FormData()
      formData.append("id", user._id)
      formData.append("coverImage", e.target.files[0])
      updateUser(formData)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  if (!user) return null

  return (
    <div className="flex flex-col items-center bg-zinc-100 text-gray-700 dark:bg-[#121212] dark:text-gray-300">
      <Navbar
        logoutUser={logoutUser}
        picturePath={loggedInUser.picturePath}
        id={loggedInUser._id}
      />

      <div className="min-h-screen w-full max-w-[1024px]">
        <div className="relative flex justify-center">
          <img
            src={
              user.coverImagePath !== ""
                ? // ? `${process.env.REACT_APP_BASE_URL}/assets/${user.coverImagePath}`
                  user.coverImagePath
                : CoverImg
            }
            loading="lazy"
            decoding="async"
            alt="coverImg"
            className={`${blurEffect ? "animate-blurImage" : ""}  aspect-video max-h-[500px] w-full object-cover object-center`}
          />

          {loggedInUser._id === user._id && (
            <label
              htmlFor="file-upload1"
              className="absolute right-[20px] top-[20px] h-[30px] w-[30px] cursor-pointer rounded-full bg-gray-300  bg-opacity-30 md:h-[50px] md:w-[50px]"
            >
              <input
                id="file-upload1"
                className="sr-only"
                name="file-upload1"
                type="file"
                accept=".png, .jpg, .jpeg, .gif"
                onChange={(e) => {
                  updateCoverImage(e)
                }}
              />
              <TbPhotoEdit className="h-full w-full p-[6px] text-gray-800 md:p-2" />
            </label>
          )}
        </div>

        <div className="-mt-[16%] block min-h-screen max-w-[1024px] bg-gray-300 bg-opacity-10 px-4 py-8 sm:px-[4%] lg:flex lg:justify-center lg:gap-2">
          <div className="w-full lg:w-[40%]">
            <UserWidget userId={userId} picturePath={user.picturePath} />
            <FriendListWidget userId={userId} />
          </div>
          <div className="mt-6 w-full lg:m-0 lg:w-[60%]">
            {loggedInUser._id === user._id && (
              <MyPostWidget picturePath={user.picturePath} isProfile />
            )}
            <PostsWidget userId={userId} isProfile />
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        theme="light"
      />
    </div>
  )
}

export default ProfilePage
