import { socket } from "../utils/SocketConn.js"
import { useDispatch, useSelector } from "react-redux"
import { setLogout, setOnlineUsers } from "../redux/authSlice.jsx"
import { useEffect } from "react"

const useUserActiveStatus = () => {
  const user = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)

  const dispatch = useDispatch()

  const logoutUser = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/auth/logout/${user._id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
    )

    if (response.ok) {
      const data = await response.json()
      console.log(data)

      socket.emit("logout")
      dispatch(setLogout())
    }
  }

  const findOnlineFriends = (users) => {
    if (users) {
      const onlineUserIds = users.map((user) => user.userId)
      const onlineFriends = user.friends
        ?.filter((f) => onlineUserIds.includes(f._id))
        .map((f) => f._id)

      dispatch(setOnlineUsers(onlineFriends))
    }
  }

  useEffect(() => {
    if (user) {
      if (socket) {
        socket.emit("addUser", user._id)

        socket.on("getUsers", findOnlineFriends)
      } else {
        logoutUser()
      }
    }

    return () => {
      socket.off("getUsers", findOnlineFriends)
    }
  }, [user])

  return { logoutUser }
}

export default useUserActiveStatus
