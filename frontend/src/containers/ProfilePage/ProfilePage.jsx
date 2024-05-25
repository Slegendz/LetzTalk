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

const ProfilePage = ({ logoutUser }) => {
  const loggedInUser = useSelector((state) => state.user)
  const [user, setUser] = useState(null)
  const { userId } = useParams()
  const token = useSelector((state) => state.token)

  const getUser = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await response.json()
    setUser(data)
  }

  useEffect(() => {
    getUser()
  }, [])

  if (!user) return null

  return (
    <div className="flex flex-col items-center bg-zinc-100 text-gray-700 dark:bg-[#121212] dark:text-gray-300">
      <Navbar logoutUser = {logoutUser} picturePath={loggedInUser.picturePath} id={loggedInUser._id} />

      <div className="min-h-screen w-full max-w-[1024px]">
        <div className="flex justify-center">
          <img
            src={
              user.coverImagePath !== ""
                // ? `${process.env.REACT_APP_BASE_URL}/assets/${user.coverImagePath}`
                ? user.coverImagePath
                : CoverImg
            }
            alt="coverImg"
            className="w-full object-cover object-center max-h-[500px] aspect-video"
            />
        </div>
            {/* max-h-[250px] sm:max-h-[400px] */}
        

        <div className="-mt-[16%] min-h-screen bg-gray-300 bg-opacity-10 block max-w-[1024px] px-4 py-8 sm:px-[4%] lg:flex lg:justify-center lg:gap-2">
          <div className="w-full lg:w-[40%]">
            <UserWidget userId={userId} picturePath={user.picturePath} />
            <FriendListWidget userId={userId} />
          </div>
          <div className="w-full lg:w-[60%] mt-6 lg:m-0">
            <MyPostWidget picturePath={user.picturePath} isProfile />
            <PostsWidget userId={userId} isProfile />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
