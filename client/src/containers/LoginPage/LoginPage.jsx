import React from "react"
import Form from "./Form"
import friends from "../../assets/Img/friends1.png"

const LoginPage = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center bg-white dark:bg-gray-800">
      <div className="mt-2 relative w-full max-w-5xl py-4 text-center z-10">
        <h1 className="text-4xl font-bold text-gray-600 dark:text-white ">
          LetzTalk
        </h1>
      </div>

      <div className="z-10 m-8 w-full max-w-5xl px-[6%] py-4 sm:text-center">
        <h2 className="mb-6 text-2xl font-bold text-gray-600 dark:text-white">
          Welcome to LetzTalk, best social media platform.
        </h2>
        <Form />
      </div>

      <img
        src={friends}
        alt="Friends"
        className="absolute bottom-0 -z-0 w-[100%] opacity-20 md:w-[60%] overflow-hidden"
      />
    </div>
  )
}

export default LoginPage
