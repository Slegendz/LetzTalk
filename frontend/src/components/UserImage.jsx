import React from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"

const UserImage = ({ image, width, height }) => {
  return (
    <LazyLoadImage
      width={width}
      height={height}
      className="rounded-full object-cover object-center"
      alt="user"
      // src={`${process.env.REACT_APP_BASE_URL}/assets/${image}`}
      src={image}
    />
  )
}

export default UserImage
