import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setMode } from "../../redux/authSlice.jsx"
import { useNavigate } from "react-router-dom"
import LogoDark from "../../assets/Img/logo-dark.png"
import LogoWhite from "../../assets/Img/logo-white.png"
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md"
import { FiMessageSquare } from "react-icons/fi"
import { FaHome } from "react-icons/fa"
import { IoIosNotifications } from "react-icons/io"
import { IoSearch } from "react-icons/io5"
import NavbarModal from "../../components/NavbarModal.jsx"

const Navbar = ({ id, picturePath, logoutUser }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const mode = useSelector((state) => state.mode)

  return (
    <>
      <div className="flex w-full items-center justify-center bg-blue-400 dark:bg-cyan-500">
        {/* Navbar (Logo & SearchBar) */}

        <div className="flex w-full max-w-[1920px] items-center gap-4 px-[4%] py-2 md:gap-6 lg:gap-8">
          <div className="flex w-1/2 items-center md:gap-6 lg:gap-8">
            <img
              onClick={() => navigate("/home")}
              src={`${mode === "light" ? LogoWhite : LogoDark}`}
              alt="Logo"
              className="w-[40%] min-w-[90px] max-w-[120px] cursor-pointer hover:animate-pulse"
            />
            <label className="relative hidden md:block md:w-[60%]">
              <input
                type="search"
                placeholder="Search"
                className="w-full rounded-xl px-4 py-[10px] text-black outline-none"
              />
              <IoSearch className="absolute right-0  top-[50%] h-full w-12 translate-y-[-50%] cursor-pointer rounded-r-xl bg-gray-300 p-2 text-2xl font-light text-blue-300" />
            </label>
          </div>

          {/* Navbar Icons */}

          <div className="flex w-1/2 items-center justify-end gap-4 md:gap-6">
            <div className="hidden items-center justify-end md:flex md:gap-4">
              <button
                className="h-[50px] w-[50px] rounded-full  text-gray-700 transition-all duration-500 hover:bg-[#ffffff6c] hover:text-gray-500"
                onClick={() => navigate("/home")}
              >
                <FaHome className="h-full w-full p-[12px]" />
              </button>
              <button
                className="h-[50px] w-[50px] rounded-full  text-gray-700 transition-all duration-500 hover:bg-[#ffffff6c] hover:text-gray-500"
                onClick={() =>
                  dispatch(setMode(mode === "light" ? "dark" : "light"))
                }
              >
                {mode === "light" ? (
                  <MdOutlineLightMode className="h-full w-full p-[12px]" />
                ) : (
                  <MdOutlineDarkMode className="h-full w-full p-[12px]" />
                )}
              </button>

              <button
                className="h-[50px] w-[50px] rounded-full  text-gray-700 transition-all duration-500 hover:bg-[#ffffff6c] hover:text-gray-500"
                onClick={() => navigate("/home")}
              >
                <IoIosNotifications className="h-full w-full p-[12px]" />
              </button>

              <button
                className="h-[50px] w-[50px] rounded-full text-gray-700 transition-all duration-500 hover:bg-[#ffffff6c] hover:text-gray-500"
                onClick={() => navigate("/messenger")}
              >
                <FiMessageSquare className="h-full w-full p-[12px]" />
              </button>
            </div>

            <NavbarModal
              id={id}
              picturePath={picturePath}
              logoutUser={logoutUser}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
