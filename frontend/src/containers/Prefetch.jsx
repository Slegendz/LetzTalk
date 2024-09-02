import React from "react"
import { Outlet } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPosts, setHomePage } from "../../redux/authSlice"

const Prefetch = () => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.token)
  const posts = useSelector((state) => state.posts)
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

  return <Outlet />
}

export default Prefetch
