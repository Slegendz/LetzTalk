import { socket } from "../utils/SocketConn.js"
import { useDispatch, useSelector } from "react-redux"
import { setLogout, setOnlineUsers } from "../redux/authSlice.jsx"
import React, { useEffect, useState } from "react"

const useUserActiveStatus = () => {
  const user = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)

  const dispatch = useDispatch()

  const logoutUser = async () => {
    const timeStamp = new Date().toISOString()
    const response = await fetch(
      `http://localhost:3001/users/updateUser/${user._id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Specify content type
        },
        body: JSON.stringify({ lastOnlineUser: timeStamp }), // Stringify the body data
      }
    )

    if (response.ok) {
      socket.emit("logout")
      dispatch(setLogout())
    }
  }

  useEffect(() => {
    if (user) {
      if (socket) {
        socket.emit("addUser", user._id)

        socket.on("getUsers", (users) => {
          if (users) {
            const onlineUserIds = users.map((user) => user.userId)

            const onlineFriends = user.friends
              .filter((f) => onlineUserIds.includes(f._id))
              .map((f) => f._id)

            dispatch(setOnlineUsers(onlineFriends))
          }
        })
      } else {
        logoutUser()
      }
    }
  }, [user])

  return { logoutUser }
}

export default useUserActiveStatus
