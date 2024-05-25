import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setMode, setLogout } from "../redux/authSlice.jsx"
import Logo from "../assets/Img/Logo.png"
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md"
import { IoChatbubbleEllipsesSharp } from "react-icons/io5"
import { FaHome } from "react-icons/fa"
import { IoNotifications } from "react-icons/io5"
import { Link, Navigate } from "react-router-dom"
import { IoMdLogOut } from "react-icons/io"

const SideBar = ({ _id, picturePath, logoutUser }) => {
  const mode = useSelector((state) => state.mode)
  const dispatch = useDispatch()
  const navigate = Navigate();

  return (
    <div className="fixed bottom-0 left-0 flex h-[60px] w-full items-center justify-evenly bg-white md:left-0 md:top-0 md:h-full md:w-[70px] md:flex-col md:justify-between md:border-r-[1.5px] md:border-r-gray-600 md:border-opacity-30  dark:md:border-opacity-60 md:px-2 md:py-4 dark:border-r-gray-600 dark:bg-black">
      <Link className="hidden md:block md:py-2" to="/home">
        <img
          src={Logo}
          alt="Logo"
          className="h-auto w-[50px] cursor-pointer hover:animate-pulse"
        />
      </Link>

      <div className="flex h-full w-full items-center justify-evenly text-gray-700 md:h-auto md:flex-col md:justify-center md:gap-4">
        <Link to="/home">
          <button className="flex h-[45px] w-[45px] items-center rounded-full transition-all duration-500 hover:bg-slate-300 hover:text-black xss:h-[50px] xss:w-[50px] dark:hover:bg-[#ffffff6c] dark:hover:text-white">
            <FaHome className=" h-full w-full p-[12px]" />
          </button>
        </Link>

        <div>
          <button
            className="flex h-[45px] w-[45px] items-center rounded-full transition-all duration-500  hover:bg-slate-300 hover:text-black xss:h-[50px] xss:w-[50px] dark:hover:bg-[#ffffff6c] dark:hover:text-white"
            onClick={() =>
              dispatch(setMode(mode === "light" ? "dark" : "light"))
            }
          >
            {mode === "light" ? (
              <MdOutlineLightMode className="h-full w-full  p-[12px]" />
            ) : (
              <MdOutlineDarkMode className="h-full  w-full p-[12px]" />
            )}
          </button>
        </div>

        <div>
          <button
            className="flex h-[45px] w-[45px] items-center rounded-full transition-all duration-500  hover:bg-slate-300 hover:text-black xss:h-[50px] xss:w-[50px] dark:hover:bg-[#ffffff6c] dark:hover:text-white"
            onClick={() => navigate("/home")}
          >
            <IoNotifications className=" h-full w-full p-[12px]" />
          </button>
        </div>

        <Link to="messenger">
          <button
            className="flex h-[45px] w-[45px] items-center rounded-full transition-all duration-500 hover:bg-slate-300 hover:text-black xss:h-[50px] xss:w-[50px] dark:hover:bg-[#ffffff6c] dark:hover:text-white"
            onClick={() => navigate("/messenger")}
          >
            <IoChatbubbleEllipsesSharp className="h-full w-full p-[12px]" />
          </button>
        </Link>

        <Link to={`/profile/${_id}`} className="md:hidden">
          <div className="h-[45px] w-[45px] xss:h-[50px] xss:w-[50px]">
            <img
              className="h-full w-full rounded-full object-cover object-center p-[8px]"
              alt="user"
              src={`${process.env.REACT_APP_BASE_URL}/assets/${picturePath}`}
            />
          </div>
        </Link>
        <div
          className="xs:block hidden h-[45px] w-[45px] rounded-full transition-all duration-500 hover:bg-slate-300 hover:text-black xss:h-[50px] xss:w-[50px] md:hidden dark:hover:bg-[#ffffff6c] dark:hover:text-white "
          onClick={logoutUser}
        >
          <IoMdLogOut className="h-full w-full p-[12px]" />
        </div>
      </div>

      <div className="hidden h-full items-center justify-center gap-4 text-gray-700 md:flex md:h-auto md:flex-col">
        <Link
          to={`/profile/${_id}`}
          className="h-[45px] w-[45px] p-[5px] xss:h-[50px] xss:w-[50px]"
        >
          <img
            className="h-full w-full rounded-full object-cover object-center"
            alt="user"
            src={`${process.env.REACT_APP_BASE_URL}/assets/${picturePath}`}
          />
        </Link>
        <div
          className="xs:block hidden h-[45px] w-[45px] rounded-full transition-all duration-500 hover:bg-slate-300 hover:text-black xss:h-[50px] xss:w-[50px] dark:hover:bg-[#ffffff6c] dark:hover:text-white "
          onClick={logoutUser}
        >
          <IoMdLogOut className="h-full w-full p-[12px]" />
        </div>
      </div>
    </div>
  )
}

export default SideBar
