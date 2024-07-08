import React from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"

const UserImage = ({ image }) => {
  return (
    <div className="h-[50px] w-[50px]">
      <LazyLoadImage
        className="h-full w-full rounded-full object-cover object-center"
        alt="user"
        // src={`${process.env.REACT_APP_BASE_URL}/assets/${image}`}
        src={image}
      />
    </div>
  )
}

export default UserImage
