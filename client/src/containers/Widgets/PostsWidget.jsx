import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPosts } from "../../redux/authSlice"
import PostWidget from "./PostWidget.jsx"

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.posts)
  const token = useSelector((state) => state.token)

  const getPosts = async () => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await response.json()
    dispatch(setPosts({ posts: data }))
  }

  const getUserPosts = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    const data = await response.json()
    dispatch(setPosts({ posts: data }))
  }

  useEffect(() => {
    if (isProfile) {
      getUserPosts()
    } else {
      getPosts()
    }
  }, [])

  return (
    <>
      {posts.length > 0 ? (
        posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
            audioPath,
            clipPath
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              audioPath={audioPath}
              clipPath={clipPath}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
            />
          )
        )
      ) : (
        <p className = "text-center text-6xl my-8 text-blue-400  font-Boomster"> No Posts </p>
      )}
    </>
  )
}

export default PostsWidget
