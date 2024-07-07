import UserImage from "../../components/UserImage"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaLocationDot } from "react-icons/fa6"
import { MdOutlineWork } from "react-icons/md"
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"
import React from "react"
import EditModal from "../../components/EditModal"
import { FaUserEdit } from "react-icons/fa"

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const token = useSelector((state) => state.token)
  const loggedInUser = useSelector((state) => state.user)
  const userFriends = useSelector((state) => state.user.friends)
  const [showModal, setShowModal] = useState(false)

  const getUser = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/users/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    const data = await response.json()
    setUser(data)
  }

  useEffect(() => {
    if (loggedInUser._id === userId) {
      setUser(loggedInUser)
    } else {
      getUser()
    }
  }, [])

  if (!user) {
    return null
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    instagramUrl,
    twitterUrl,
    linkedinUrl,
  } = user

  return (
    <>
      <div className="rounded-xl bg-white p-4 shadow-md drop-shadow-lg dark:bg-[#282828]">
        <div gap="1rem" className="relative mb-4 flex items-center gap-4">
          <UserImage image={picturePath} />
          <div>
            <h4
              onClick={() => navigate(`/profile/${userId}`)}
              className="cursor-pointer text-3xl hover:text-blue-500"
            >
              {firstName} {lastName}
            </h4>
            <p>{userFriends.length} friends</p>
          </div>

          {loggedInUser._id === user._id && (
            <button
              className="absolute right-[-5px] top-[50%] h-[40px] w-[40px] translate-y-[-50%] cursor-pointer hover:rounded-full hover:bg-gray-200 hover:bg-opacity-30"
              onClick={() => setShowModal(!showModal)}
            >
              <FaUserEdit className="h-full w-full p-2 text-gray-600 dark:text-gray-400" />
            </button>
          )}
        </div>

        <div className="h-[1px] bg-zinc-100 dark:bg-[#121212]"></div>

        {/* SECOND ROW */}
        <div className="px-0 py-4 text-lg ">
          <div className="mb-2 flex items-center gap-4">
            <FaLocationDot className="text-2xl text-blue-400" />
            <p>{location}</p>
          </div>
          <div className="mb-2 flex items-center gap-4">
            <MdOutlineWork className="text-2xl text-blue-400" />
            <p>{occupation}</p>
          </div>
        </div>

        <div className="h-[1px] bg-zinc-100 dark:bg-[#121212]"></div>

        {/* THIRD ROW */}
        <div className="px-0 py-4 text-base ">
          <div className="mb-2 flex items-center justify-between gap-4">
            <p> Who's viewed your profile </p>
            <p className="font-bold">{viewedProfile}</p>
          </div>
          <div className="mb-2 flex items-center justify-between gap-4">
            <p> Impressions of your post </p>
            <p className="font-bold">{impressions}</p>
          </div>
        </div>

        <div className="h-[1px] bg-zinc-100 dark:bg-[#121212]"></div>

        {/* FOURTH ROW */}
        <div className="px-0 py-4 text-base ">
          <p className="mb-4 text-lg text-blue-400"> Social Profiles </p>
          <div className="mb-2 flex items-center gap-4">
            <FaLinkedin className="text-2xl" />
            <a
              href={linkedinUrl}
              className="text-sm hover:text-blue-400 hover:underline"
            >
              {linkedinUrl === "" ? "Linkedin" : linkedinUrl}
            </a>
          </div>
          <div className="mb-2 flex items-center gap-4">
            <FaInstagram className="text-2xl" />
            <a
              href={instagramUrl}
              className="text-sm hover:text-blue-400 hover:underline"
            >
              {instagramUrl === "" ? "Instagram" : instagramUrl}
            </a>
          </div>
          <div className="mb-2 flex items-center gap-4">
            <FaTwitter className="text-2xl" />
            <a
              href={twitterUrl}
              className="text-sm hover:text-blue-400 hover:underline"
            >
              {twitterUrl === "" ? "Twitter" : twitterUrl}
            </a>
          </div>
        </div>
      </div>

      {showModal && (
        <EditModal setShowModal={setShowModal} user={user} setUser={setUser} />
      )}
    </>
  )
}

export default UserWidget
