import React, { useState } from "react"
import { setPost } from "../redux/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { formatDistanceToNowStrict } from "date-fns"
import { GoDotFill } from "react-icons/go"
import { IoPaperPlane } from "react-icons/io5"

const CommentPost = ({ comments, isComments, postId}) => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.token)
  const loggedInUserId = useSelector((state) => state.user._id)

  const [comment, setComment] = useState("")
  const [userComments, setUserComments] = useState(comments)

  // To handle comment
  const handleComment = async (e) => {
    e.preventDefault()
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/posts/${postId}/comment`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId, comment: comment }),
      }
    )

    const updatedPost = await response.json()

    setUserComments(updatedPost.comments)
    setComment("")
    dispatch(setPost({ post: updatedPost }))
  }

  return (
    <div>
      {/* To view user comments */}
      {isComments && (
        <div className="flex flex-col">
          <form
            onSubmit={handleComment}
            className="mb-2 flex items-center justify-between px-2"
          >
            <textarea
              type="text"
              placeholder="Add comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex w-full resize-none overflow-hidden rounded-2xl border-none bg-transparent px-4 pb-3 pt-1 text-black outline-none dark:text-white"
            ></textarea>
            <button
              type="submit"
              className="rounded-full bg-blue-400 p-2 text-center text-2xl text-white outline-none"
            >
              <IoPaperPlane />
            </button>
          </form>

          <div className="h-[1px] w-full rounded-lg bg-gray-500 opacity-40"></div>

          {userComments?.map((comment, i) => {
            const { content, user, createdAt } = comment
            const time = formatDistanceToNowStrict(createdAt)

            return (
              <div key={i} className="my-2 px-4">
                <div className="flex w-full flex-1 items-start justify-start gap-4">
                  <img
                    src={user.picturePath}
                    alt="User-pic"
                    className="my-1 h-[40px] w-[40px] rounded-full object-cover"
                  />

                  <div className="flex flex-1 flex-col items-start justify-start">
                    <div className="flex items-center">
                      <p className="font-bold">
                        {user.firstName + user.lastName}
                      </p>
                      <GoDotFill className="p-1 text-sm text-gray-500" />
                      <p className="text-[10px] text-gray-500"> {time} </p>
                    </div>
                    <p className="text-sm wrapWord"> {content} </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default CommentPost
