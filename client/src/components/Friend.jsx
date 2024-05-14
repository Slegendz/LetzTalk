import { useDispatch, useSelector } from "react-redux"
import { setFriends } from "../redux/authSlice"
import UserImage from "./UserImage"
import { FaUserPlus } from "react-icons/fa6"
import { FaUserMinus } from "react-icons/fa"

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch()

  const { _id } = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)
  const friends = useSelector((state) => state.user.friends)
  const user = useSelector((state) => state.user)

  let isFriend = friends.find((friend) => friend._id === friendId)

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
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
        <UserImage userId = {friendId} image={userPicturePath} />
        <div>
          <a
            href={`http://localhost:5173/profile/${friendId}`}
            className="cursor-pointer text-xl hover:text-blue-400"
          >
            {name}
          </a>
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
