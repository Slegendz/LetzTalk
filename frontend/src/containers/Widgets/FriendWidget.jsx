import Friend from "../../components/Friend"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setFriends } from "../../redux/authSlice"
import React from "react"
import fetchFriends from "../../utils/fetchFriends.js"

const FriendListWidget = ({ userId, friends }) => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.token)

  useEffect(() => {
    const getFriends = async () => {
      const data = await fetchFriends({ userId, token })
      if (data) {
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
