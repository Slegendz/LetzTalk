import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import FriendListWidget from "../Widgets/FriendWidget"
import MyPostWidget from "../Widgets/MyPostWidget"
import PostsWidget from "../Widgets/PostsWidget"
import UserWidget from "../Widgets/UserWidget"
import React from "react"

const ProfilePage = () => {
  const loggedInUser = useSelector((state) => state.user)
  const [user, setUser] = useState(null)
  const { userId } = useParams()
  const token = useSelector((state) => state.token)
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)")

  const getUser = async () => {
    const response = await fetch(
      `${process.env.REACT_BASE_URL}/users/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    const data = await response.json()
    setUser(data)
  }

  useEffect(() => {
    getUser()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null

  return (
    <div className="flex flex-col items-center bg-zinc-100 text-gray-700 dark:bg-[#121212] dark:text-gray-300">
      <Navbar picturePath={loggedInUser.picturePath} id={loggedInUser._id} />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </div>
  )
}

export default ProfilePage
