import React from "react"
import david from "../../assets/Img/david.png"

const AdvertWidget = () => {
  return (
    <div className="my-2 rounded-xl bg-white p-4 drop-shadow-lg md:m-2 lg:mt-0 dark:bg-[#282828]">
      <div>
        <p>Sponsored</p>
        <p>Create Ad</p>
      </div>
      <img className = "rounded-lg my-2" loading = "lazy" width="100%" height="auto" alt="advert" src= {david} />
      <div className = "my-2">
        <p className = "text-cyan-400"> David Shop </p>
        <p> davidShop.com </p>
      </div>
      <p>
        Always available for you. Visit our shops and get good discounts on
        various products. Shop Now
      </p>
    </div>
  )
}

export default AdvertWidget
