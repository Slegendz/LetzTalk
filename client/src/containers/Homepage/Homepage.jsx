import { useSelector, useDispatch } from "react-redux"
import Navbar from "../Navbar/Navbar.jsx"
import UserWidget from "../Widgets/UserWidget.jsx"
import MyPostWidget from "../Widgets/MyPostWidget"
import PostsWidget from "../Widgets/PostsWidget"
import AdvertWidget from "../Widgets/AdWidget.jsx"
import FriendListWidget from "../Widgets/FriendWidget"
import React, { useEffect } from "react"

const HomePage = ({ logoutUser }) => {
  const { _id, picturePath } = useSelector((state) => state.user)

  return (
    <div className="flex flex-col items-center bg-zinc-100 text-gray-700 dark:bg-[#121212] dark:text-gray-300">
      <Navbar logoutUser={logoutUser} picturePath={picturePath} id={_id} />
      <div className="min-h-screen max-w-[786px] lg:max-w-[1920px]">
        <div className="block w-full p-4 py-8 sm:px-[6%] lg:flex lg:justify-between lg:gap-2">
          <div className="w-full lg:w-[25%]">
            <UserWidget userId={_id} picturePath={picturePath} />
          </div>
          <div className="w-full lg:w-[45%]">
            <MyPostWidget picturePath={picturePath} />
            <PostsWidget userId={_id} />
          </div>
          <div className="hidden lg:block lg:w-[25%]">
            <AdvertWidget />
            <FriendListWidget userId = {_id} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
