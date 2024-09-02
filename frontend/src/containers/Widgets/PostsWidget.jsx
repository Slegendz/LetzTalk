import React from "react"
import { useSelector } from "react-redux"
import PostWidget from "./PostWidget.jsx"

const PostsWidget = () => {
  const posts = useSelector((state) => state.posts)

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
            clipPath,
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
        <p className="my-8 text-center font-Boomster text-6xl  text-blue-400">
          No Posts
        </p>
      )}
    </>
  )
}

export default PostsWidget
