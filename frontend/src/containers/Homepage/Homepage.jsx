import { useSelector } from "react-redux"
import Navbar from "../Navbar/Navbar.jsx"
import UserWidget from "../Widgets/UserWidget.jsx"
import MyPostWidget from "../Widgets/MyPostWidget"
import PostsWidget from "../Widgets/PostsWidget"
import AdvertWidget from "../Widgets/AdWidget.jsx"
import FriendListWidget from "../Widgets/FriendWidget"
import React from "react"

const HomePage = ({ logoutUser }) => {
  const { _id, picturePath } = useSelector((state) => state.user)

  return (
    <div className="flex w-full flex-col items-center bg-zinc-100 text-gray-700 dark:bg-[#121212] dark:text-gray-300">
      <Navbar logoutUser={logoutUser} picturePath={picturePath} id={_id} />

      <div className="grid grid-cols-7 min-h-screen w-full max-w-[786px] p-4 py-8 sm:px-[6%] lg:max-w-[1920px] lg:gap-4">
        <div className="col-span-7 lg:col-span-2">
          <UserWidget userId={_id} picturePath={picturePath} />
        </div>
        <div className="col-span-7 lg:col-span-3">
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </div>
        <div className="hidden lg:block lg:col-span-2">
          <AdvertWidget />
          <FriendListWidget userId={_id} />
        </div>
      </div>
    </div>
  )
}

export default HomePage
