import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPosts, setHomePage } from "../../redux/authSlice"
import PostWidget from "./PostWidget.jsx"

const PostsWidget = () => {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.posts)
  const token = useSelector((state) => state.token)
  const homePage = useSelector((state) => state.homePage)

  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    const url = `${process.env.REACT_APP_BASE_URL}/posts?page=${homePage}`

    const fetchPosts = async (url) => {
      setLoading(true)
      
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch posts")
        }

        const data = await response.json()

        if (homePage === 1) {
          dispatch(setPosts({ posts: data }))
        } else {
          dispatch(setPosts({ posts: [...posts, ...data] }))
        }
        setHasMore(data.length > 0)
      } catch (error) {
        console.error("Error fetching posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts(url)
  }, [homePage])

  useEffect(() => {
    const handleScroll = () => {
      if (
        !loading &&
        hasMore &&
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.scrollHeight - 20
      ) {
        dispatch(setHomePage())
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [loading, hasMore])

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
