import React, { useState, useRef } from "react"
import { FiMessageSquare } from "react-icons/fi"
import { FaHome } from "react-icons/fa"
import { IoIosNotifications } from "react-icons/io"
import UserImage from "./UserImage.jsx"
import { Link } from "react-router-dom"
import { CgProfile } from "react-icons/cg"
import { IoSearch } from "react-icons/io5"

const NavbarModal = ({ id, picturePath, logoutUser }) => {
  const modalRef = useRef()
  const searchModalRef = useRef()

  const [showModal, setShowModal] = useState(false)
  const [searchModal, setSearchModal] = useState(false)

  const handleModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowModal(false)
    }

    if (searchModalRef.current && !searchModalRef.current.contains(e.target)) {
      setSearchModal(false)
    }
  }

  document.addEventListener("mousedown", handleModal)

  return (
    <div ref={modalRef} className="relative flex items-center">
      <button onClick={() => setShowModal(!showModal)}>
        <UserImage image={picturePath} />
      </button>

      {/* Show Modal */}

      {showModal && (
        <div className="absolute right-0 top-[60px] z-50 min-w-[200px] rounded-lg bg-white p-1 text-lg font-light text-grey-500 shadow-xl md:min-w-[260px] dark:bg-slate-600  dark:text-white">
          <ul>
            <li className="transiton-all rounded-lg p-3 px-4 duration-500 hover:bg-gray-200 dark:hover:bg-gray-500">
              <Link
                className="flex w-full items-center gap-3"
                to={`/profile/${id}`}
              >
                <CgProfile className="text-xl" />
                Profile
              </Link>
            </li>
            <li className=" transiton-all rounded-lg p-3 px-4 duration-500 hover:bg-gray-200 dark:hover:bg-gray-500">
              <Link
                className="flex w-full items-center gap-3"
                to="/home"
                onClick={() => setSearchModal(!searchModal)}
              >
                <IoSearch className="text-xl" />
                Search
              </Link>
            </li>
            <li className="transiton-all rounded-lg p-3 px-4 duration-500 hover:bg-gray-200 dark:hover:bg-gray-500 ">
              <Link className="flex w-full items-center gap-3" to="/home">
                <FaHome className="text-xl" />
                Home
              </Link>
            </li>
            <li className="transiton-all rounded-lg p-3 px-4 duration-500 hover:bg-gray-200 dark:hover:bg-gray-500 ">
              <Link
                className="flex w-full items-center gap-3"
                to={`/messenger`}
              >
                <FiMessageSquare className="text-xl" />
                Chats
              </Link>
            </li>
            <li className="transiton-all rounded-lg p-3 px-4 duration-500 hover:bg-gray-200 dark:hover:bg-gray-500 ">
              <Link
                className="flex w-full items-center gap-3"
                to={`/notifications/${id}`}
              >
                <IoIosNotifications className="text-xl" />
                Notifications
              </Link>
            </li>

            <div className="my-2 h-[2px] w-full bg-blue-400 dark:bg-gray-400"></div>
            <li className="transiton-all flex cursor-pointer items-center gap-3 rounded-lg p-3 px-4 duration-500 hover:bg-gray-200 dark:hover:bg-gray-500 ">
              <p className="w-full" onClick={logoutUser}>
                Log Out
              </p>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default NavbarModal
