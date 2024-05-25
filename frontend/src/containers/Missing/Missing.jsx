import React from "react"
import { BiSolidError } from "react-icons/bi"
import { Link } from "react-router-dom"

const Missing = () => {
  return (
    <div className="min-h-screen w-full  text-black  dark:text-white">
      <div className="flex min-h-screen gap-4 flex-col items-center justify-center bg-red-500">
        <h2 className = "text-6xl"> 404</h2>
        <div className="flex items-center gap-4 justify-center">
          <div className="text-6xl">
            <BiSolidError />
          </div>
          <div className="text-lg">
            <h3> Oops! page not found</h3>
            <p>
              It seems we can’t find what you’re looking for. Perhaps searching
              can help.
            </p>
            <Link to="/home">
              <button className= "text-blue-400 text-xl bg-white rounded-lg px-4 py-2"> Go to Home </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Missing
