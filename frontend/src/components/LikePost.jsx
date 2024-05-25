import React, { useState, useEffect } from "react"
import { setPost } from "../redux/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { FaRegHeart, FaHeart } from "react-icons/fa"

const LikePost = ({ likes, postId }) => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.token)
  const loggedInUserId = useSelector((state) => state.user._id)

  // Like, comment and Share Functionality
  const [isLiked, setIsLiked] = useState(Boolean(likes[loggedInUserId]))
  const [likeCount, setLikeCount] = useState(Object.keys(likes).length)

  useEffect(() => {
    setIsLiked(likes[loggedInUserId])
  }, [loggedInUserId, likes])

  
  // Add or Remove Like functionality
  const patchLike = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    })
    const updatedPost = await response.json()
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
    setIsLiked(!isLiked)

    dispatch(setPost({ post: updatedPost }))
  }

  return (
    <div className="flex items-center">
      <button
        className="relative p-2 before:absolute before:inset-1 before:block before:rounded-full before:blur-md hover:text-red-400 hover:before:bg-rose-500"
        onClick={patchLike}
      >
        {!isLiked ? (
          <FaRegHeart />
        ) : (
          <FaHeart className="animate__animated animate__bounceIn text-red-500" />
        )}
      </button>
      <p className="text-sm">{likeCount}</p>
    </div>
  )
}

export default LikePost
