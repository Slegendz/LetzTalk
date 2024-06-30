import Friend from "../../components/Friend"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setFriends } from "../../redux/authSlice"
import React from "react"

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.token)
  const user = useSelector((state) => state.user)
  const friends = useSelector((state) => state.user.friends)

  useEffect(() => {
    const getFriends = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/users/${userId}/friends`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      const data = await response.json()
      if (response.ok) {
        dispatch(setFriends(data))
      }
    }
    getFriends()
  }, [])

  return (
    <div className="m-2 my-4">
      <p className="my-2 text-lg">Friend List</p>
      <div className="flex flex-col gap-4">
        {friends.map((friend, idx) => {
          return (
            <Friend
              key={idx}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
            />
          )
        })}
      </div>
    </div>
  )
}

export default FriendListWidget
