import UserImage from "../../components/UserImage"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaLocationDot } from "react-icons/fa6"
import { MdOutlineWork } from "react-icons/md"
import { FaTwitter } from "react-icons/fa"
import { FaInstagram } from "react-icons/fa"
import { FaLinkedin } from "react-icons/fa"
import React from "react"

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const token = useSelector((state) => state.token)
  const userFriends = useSelector((state) => state.user.friends);

  const getUser = async () => {
    const response = await fetch(`${process.env.REACT_BASE_URL}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await response.json()
    setUser(data)
  }

  useEffect(() => {
    getUser()
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
    friends,
  } = user;

  return (
    <div className="rounded-xl bg-white p-4 shadow-md drop-shadow-lg dark:bg-[#282828]">
      <div className="mb-4">
        <div
          gap="1rem"
          
          className="flex items-center gap-4"
        >
          <UserImage image={picturePath} />
          <div>
            <h4 onClick={() => navigate(`/profile/${userId}`)} className="cursor-pointer text-3xl hover:text-blue-500">
              {firstName} {lastName}
            </h4>
            <p>{userFriends.length} friends</p>
          </div>
        </div>
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
          <a href="#" className="hover:text-blue-400 hover:underline">
            {" "}
            Linkedin{" "}
          </a>
        </div>
        <div className="mb-2 flex items-center gap-4">
          <FaInstagram className="text-2xl" />
          <a href="#" className="hover:text-blue-400 hover:underline">
            {" "}
            Instagram{" "}
          </a>
        </div>
        <div className="mb-2 flex items-center gap-4">
          <FaTwitter className="text-2xl" />
          <a href="#" className="hover:text-blue-400 hover:underline">
            {" "}
            Twitter{" "}
          </a>
        </div>
      </div>
    </div>
  )
}

export default UserWidget
