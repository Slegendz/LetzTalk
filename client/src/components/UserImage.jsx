import React from "react"

const UserImage = ({ image }) => {
  return (
    <div
      className="h-[50px] w-[50px]"
    >
      <img
        className="h-full w-full rounded-full object-cover object-center"
        alt="user"
        src={`${import.meta.env.VITE_BASE_URL}/assets/${image}`}
      />
    </div>
  )
}

export default UserImage
