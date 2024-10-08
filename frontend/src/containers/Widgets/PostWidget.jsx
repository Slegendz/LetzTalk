import Friend from "../../components/Friend"
import { useRef, useState } from "react"
import { FaRegComment } from "react-icons/fa"
import CommentPost from "../../components/CommentPost"
import SharePost from "../../components/SharePost"
import LikePost from "../../components/LikePost"
// import FormatNumber from "../../components/FormatNumber"
import React from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
  audioPath,
  clipPath,
}) => {
  const [isComments, setIsComments] = useState(false)
  const audioRef = useRef()

  return (
    <div className="my-2 rounded-xl border-[1px] border-gray-400 border-opacity-30 bg-white drop-shadow-lg md:m-2 dark:bg-[#282828]">
      <div className="p-4">
        <Friend
          friendId={postUserId}
          name={name}
          subtitle={location}
          userPicturePath={userPicturePath}
        />
        <p className="wrapWord mt-4 px-1 text-sm">{description}</p>
      </div>

      {/* {picturePath ? (
        picturePath.endsWith(".mp4") ? (
          <video
            loading="lazy"
            className="h-full max-h-[400px] w-full bg-[#121212] object-contain md:max-h-[520px] "
            muted
            disablePictureInPicture
            style={{ pointerEvents: "none" }}
          >
            <source
              src={`http://localhost:3001/assets/${picturePath}`}
              type="video/mp4"
            />
          </video>
        ) : (
          <img
            loading="lazy"
            className="h-full max-h-[400px] w-full bg-[#121212] object-contain md:max-h-[520px]"
            alt="post"
            src={`http://localhost:3001/assets/${picturePath}`}
          />
        )
      ) : (
        ""
      )} */}

      {picturePath && (
        <LazyLoadImage
          className="w-full h-auto max-h-[380px] bg-[#121212] object-contain md:max-h-[500px]"
          alt="Post"
          effect="opacity"
          wrapperProps={{
            style: { transitionDelay: "0.2s" },
          }}
          // src={`${process.env.REACT_APP_BASE_URL}/assets/${picturePath}`}
          src={picturePath}
        />
      )}

      {clipPath && (
        <video
          loading="lazy"
          className="h-full max-h-[380px] w-full bg-[#121212] object-contain object-center md:max-h-[500px] "
          muted
          controls
          preload="meta"
          disablePictureInPicture
          // style={{ pointerEvents: "none" }}
        >
          <source
            // src={`${process.env.REACT_APP_BASE_URL}/assets/${clipPath}`}
            src={clipPath}
            type="video/mp4"
          />
        </video>
      )}

      {audioPath && (
        <div className="flex w-full justify-center">
          <audio
            ref={audioRef}
            loading="lazy"
            controlsList="nodownload noplaybackrate"
            // src={`${process.env.REACT_APP_BASE_URL}/assets/${audioPath}`}
            src={audioPath}
            controls
            type="audio/mp3"
            className="audioNoVolumeBar w-[60%]"
          ></audio>
        </div>
      )}

      {/* Like, Comment and Share */}

      <div className="m-2 flex items-center justify-between text-xl">
        <div className="flex items-center gap-4">
          <LikePost likes={likes} postId={postId} />

          <div className="flex items-center bg-opacity-0">
            <button
              className="relative p-2 before:absolute before:inset-1 before:block before:rounded-full before:blur-md hover:text-blue-400 hover:before:bg-blue-400"
              onClick={() => setIsComments(!isComments)}
            >
              <FaRegComment />
            </button>
            {/* <FormatNumber count = {1001} /> */}
            <p className="text-sm"> {comments?.length}</p>
          </div>
        </div>

        {/* Share Functionality */}
        <SharePost name={name} postId={postId} />
      </div>

      <CommentPost
        comments={comments}
        isComments={isComments}
        postId={postId}
      />
    </div>
  )
}

export default PostWidget
