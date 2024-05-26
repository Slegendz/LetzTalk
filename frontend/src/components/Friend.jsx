import { useDispatch, useSelector } from "react-redux"
import { setFriends } from "../redux/authSlice"
import UserImage from "./UserImage"
import { FaUserPlus } from "react-icons/fa6"
import { FaUserMinus } from "react-icons/fa"
import React from "react"
import { Link } from "react-router-dom"

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch()

  const { _id } = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)
  const friends = useSelector((state) => state.user.friends)
  const user = useSelector((state) => state.user)

  let isFriend = friends.find((friend) => friend._id === friendId)

  const patchFriend = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
    const data = await response.json()
    dispatch(setFriends(data))
  }

  return (
    <div className="flex items-center justify-between text-gray-700 dark:text-gray-300">
      <div className="flex gap-4">
        <UserImage userId={friendId} image={userPicturePath} />
        <div>
          {/* <a href={`${process.env.REACT_APP_BASE_URL}/users/${friendId}`}>
            {name}
          </a> */}

          <Link
            to={`/profile/${friendId}`}
            className="cursor-pointer text-xl hover:text-blue-400"
          >
            {" "}
            {name}{" "}
          </Link>
          <p className="text-sm"> {subtitle} </p>
        </div>
      </div>

      {friendId !== user._id && (
        <div
          onClick={() => patchFriend()}
          className="flex cursor-pointer items-center justify-center rounded-full bg-blue-400 p-3 text-white"
        >
          {isFriend ? <FaUserMinus /> : <FaUserPlus />}
        </div>
      )}
    </div>
  )
}

export default Friend
