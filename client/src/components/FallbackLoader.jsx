import React from "react"
import LogoDark from "../assets/Img/logo-dark.png"
import LogoWhite from "../assets/Img/logo-white.png"
import { useSelector } from "react-redux"

const FallbackLoader = () => {
  const mode = useSelector((state) => state.mode)

  return (
    <div className="flex h-screen items-center justify-center dark:bg-black bg-white">
      <div>
        <img src={`${mode === "light" ? LogoDark : LogoWhite}`} className = "w-[400px] h-auto" alt="Logo" />
        <span className="visually-hidden"> Loading... </span>
      </div>
    </div>
  )
}

export default FallbackLoader
