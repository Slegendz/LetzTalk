import { createSlice } from "@reduxjs/toolkit"
import { setDark, setLight, defaultDark } from "../utils/LightDarkMode.js"

const initialState = {
  mode: defaultDark ? setDark() : setLight(),
  user: null,
  token: null,
  posts: [],
  onlineUsers: [],
  profilePosts: [],
  homePage: 1,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserPic: (state, action) => {
      state.user.picturePath = action.payload
    },
    setUserDetails: (state, action) => {
      state.user = action.payload
    },
    setMode: (state, action) => {
      state.mode = action.payload
      if (state.mode === "light") setLight()
      else setDark()
    },
    setLogin: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.homePage = 1
    },
    setLogout: (state) => {
      state.user = null
      state.token = null
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload
      } else {
        console.log("User does not exist.")
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts
    },
    setProfilePosts: (state, action) => {
      state.profilePosts = action.payload.profilePosts
    },
    setHomePage: (state) => {
      state.homePage = state.homePage + 1
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post
        return post
      })
      state.posts = updatedPosts
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload
    },
  },
})

export const {
  setMode,
  setFriends,
  setLogin,
  setLogout,
  setPosts,
  setPost,
  setOnlineUsers,
  setUserPic,
  setProfilePosts,
  setHomePage,
  setUserDetails,
} = authSlice.actions

export default authSlice.reducer
