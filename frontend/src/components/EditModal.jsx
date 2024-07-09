import React, { useState } from "react"
import { IoMdArrowRoundBack } from "react-icons/io"
import "animate.css"
import { LiaUserEditSolid } from "react-icons/lia"
import { Formik } from "formik"
import * as yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { setUserPic, setUserDetails, setPosts } from "../redux/authSlice"

const EditModal = ({ setShowModal, user, setUser }) => {
  const {
    firstName,
    lastName,
    occupation,
    location,
    _id,
    picturePath,
    instagramUrl,
    twitterUrl,
    linkedinUrl,
  } = user

  const token = useSelector((state) => state.token)
  const dispatch = useDispatch()
  const [disable, setDisable] = useState(false)

  const updateUserSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    twitter: yup.string(),
    instagram: yup.string(),
    linkedin: yup.string(),
  })

  const initialValueUser = {
    firstName,
    lastName,
    location,
    occupation,
    twitter: twitterUrl,
    instagram: instagramUrl,
    linkedin: linkedinUrl,
  }

  const updateUserImage = (e) => {
    if (user) {
      setDisable(true)
      const formData = new FormData()
      formData.append("id", _id)
      formData.append("picture", e.target.files[0])
      updateUser(formData)
    }
  }

  const updateUser = async (formData) => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/users/updateUser`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    )
    const updatedUser = await response.json()

    if (response.ok) {
      setUser(updatedUser)
      dispatch(setUserPic(updatedUser.picturePath))

      toast.success("User is updated", {
        position: "top-right",
        autoClose: 3000,
        newestOnTop: true,
        theme: "light",
        hideProgressBar: false,
      })

      const userObj = {}
      userObj["userPicturePath"] = updatedUser.picturePath;
      userObj["userId"] = updatedUser._id;

      const updatePostUser = await fetch(
        `${process.env.REACT_APP_BASE_URL}/posts/updatePostUser`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userObj),
        }
      )
      const updatedPosts = await updatePostUser.json()

      if (updatePostUser.ok) {
        dispatch(setPosts({ posts: updatedPosts }))
      }
    } else {
      toast.error(`${updatedUser.message}`, {
        position: "top-right",
        autoClose: 3000,
        newestOnTop: true,
        theme: "light",
        hideProgressBar: false,
      })
    }
    setDisable(false)
  }

  const handleSubmitUser = async (values, onSubmitProps) => {
    const formData = new FormData()
    const userObj = {}

    formData.append("id", _id)
    userObj["userId"] = _id

    for (let value in values) {
      formData.append(value, values[value])
      userObj[value] = values[value]
    }

    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/users/updateUser`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      }
    )

    const data = await response.json()
    onSubmitProps.resetForm()

    if (response.ok) {
      setUser(data)
      dispatch(setUserDetails(data))

      toast.success("User Updated", {
        position: "top-right",
        autoClose: 3000,
        newestOnTop: true,
        theme: "light",
        hideProgressBar: false,
      })

      console.log(userObj)
      const updatePostUser = await fetch(
        `${process.env.REACT_APP_BASE_URL}/posts/updatePostUser`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userObj),
        }
      )
      const updatedPosts = await updatePostUser.json()

      if (updatePostUser.ok) {
        dispatch(setPosts({ posts: updatedPosts }))
      }

      setTimeout(() => {
        setShowModal(false)
      }, 1000)
    } else {
      toast.error(`${data.message}`, {
        position: "top-right",
        autoClose: 3000,
        newestOnTop: true,
        theme: "light",
        hideProgressBar: false,
      })
    }
  }

  return (
    <div className="animate__animated animate__fadeIn fixed left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="flex h-full w-full flex-col overflow-scroll overflow-x-hidden bg-white p-4 text-gray-500 sm:w-[50%] sm:min-w-[500px] sm:rounded-2xl dark:bg-[#23272f] dark:text-gray-300">
        <div className="relative mb-3 w-full p-2 md:mb-5">
          <button
            disabled={disable}
            className="absolute left-0 top-[50%] h-[45px] w-[45x] translate-y-[-50%] cursor-pointer hover:rounded-full hover:bg-gray-200 hover:bg-opacity-30"
            onClick={() => setShowModal(false)}
          >
            <IoMdArrowRoundBack className="h-full w-full p-2" />
          </button>

          <h3 className="w-full text-center font-Nunito text-2xl font-bold">
            Update Profile
          </h3>
        </div>

        <Formik
          onSubmit={handleSubmitUser}
          initialValues={initialValueUser}
          validationSchema={updateUserSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            resetForm,
            handleBlur,
          }) => (
            <form onSubmit={handleSubmit} className="p-2">
              <div className="relative mb-2 flex items-center justify-center md:mb-4">
                <label
                  htmlFor="file-upload"
                  className="relative h-auto w-[200px] cursor-pointer rounded-full shadow-lg"
                >
                  <img
                    className="aspect-square h-full w-full rounded-full object-cover object-center"
                    alt="UserPic"
                    loading="lazy"
                    decoding="async"
                    src={picturePath}
                  />
                  <div className="absolute inset-0 z-[10] rounded-full bg-black opacity-30"></div>

                  <input
                    id="file-upload"
                    className="sr-only"
                    name="file-upload"
                    type="file"
                    accept=".png, .jpg, .jpeg, .gif"
                    onChange={(e) => {
                      updateUserImage(e)
                    }}
                  />
                  <LiaUserEditSolid className="absolute left-[50%] top-[50%] z-[20] h-[30px] w-[30px] translate-x-[-50%] translate-y-[-50%] text-white" />
                </label>
              </div>

              <div className="md:flex md:gap-6">
                <div className="relative mb-6 w-full">
                  <span className="mb-2 pl-2 text-sm">Firstname</span>

                  <input
                    name="firstName"
                    aria-label="First Name"
                    aria-required="true"
                    value={values.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    onBlur={handleBlur}
                    className={`w-full rounded-[6px] border-[2px] bg-transparent p-4 text-base text-black outline-2 -outline-offset-2 transition-all duration-100  focus-within:border-transparent focus-within:outline  dark:text-gray-400 dark:hover:border-gray-400 ${errors.firstName && touched.firstName ? " border-red-500 outline-red-500 hover:border-red-600 dark:hover:border-red-600" : "border-gray-400 outline-cyan-500 hover:border-gray-900 focus-within:hover:border-transparent"}`}
                  />
                  {touched.firstName && errors.firstName && (
                    <div className="absolute left-4 text-sm font-light text-red-500">
                      {errors.firstName}
                    </div>
                  )}
                </div>

                <div className="relative mb-6 w-full">
                  <span className="mb-2 pl-2 text-sm">LastName</span>
                  <input
                    name="lastName"
                    aria-label="Last Name"
                    aria-required="true"
                    value={values.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    onBlur={handleBlur}
                    className={`w-full rounded-[6px] border-[2px] bg-transparent p-4 text-base text-black outline-2 -outline-offset-2 transition-all duration-100  focus-within:border-transparent focus-within:outline  dark:text-gray-400 dark:hover:border-gray-400 ${errors.lastName && touched.lastName ? " border-red-500 outline-red-500 hover:border-red-600 dark:hover:border-red-600" : "border-gray-400 outline-cyan-500 hover:border-gray-900 focus-within:hover:border-transparent"}`}
                  />
                  {touched.lastName && errors.lastName && (
                    <div className="absolute left-4 text-sm font-light text-red-500">
                      {errors.lastName}
                    </div>
                  )}
                </div>
              </div>

              <div className="relative mb-6 w-full">
                <span className="mb-2 pl-2 text-sm"> Location </span>
                <input
                  name="location"
                  aria-label="Location"
                  aria-required="true"
                  value={values.location}
                  onChange={handleChange}
                  placeholder="Location"
                  onBlur={handleBlur}
                  className={`w-full rounded-[6px] border-[2px] bg-transparent p-4 text-base text-black outline-2 -outline-offset-2 transition-all duration-100  focus-within:border-transparent focus-within:outline  dark:text-gray-400 dark:hover:border-gray-400 ${errors.location && touched.location ? " border-red-500 outline-red-500 hover:border-red-600 dark:hover:border-red-600" : "border-gray-400 outline-cyan-500 hover:border-gray-900 focus-within:hover:border-transparent"}`}
                />
                {touched.location && errors.location && (
                  <div className="absolute left-4 text-sm font-light text-red-500">
                    {" "}
                    {errors.location}{" "}
                  </div>
                )}
              </div>

              <div className="relative mb-6 w-full">
                <span className="mb-2 pl-2 text-sm"> Occupation</span>
                <input
                  name="occupation"
                  aria-label="Occupation"
                  aria-required="true"
                  value={values.occupation}
                  onChange={handleChange}
                  placeholder="Occupation"
                  onBlur={handleBlur}
                  className={`w-full rounded-[6px] border-[2px] bg-transparent p-4 text-base text-black outline-2 -outline-offset-2 transition-all duration-100  focus-within:border-transparent focus-within:outline  dark:text-gray-400 dark:hover:border-gray-400 ${errors.occupation && touched.occupation ? " border-red-500 outline-red-500 hover:border-red-600 dark:hover:border-red-600" : "border-gray-400 outline-cyan-500 hover:border-gray-900 focus-within:hover:border-transparent"}`}
                />
                {touched.occupation && errors.occupation && (
                  <div className="absolute left-4 text-sm font-light text-red-500">
                    {errors.occupation}
                  </div>
                )}
              </div>

              <div className="relative mb-6 w-full">
                <span className="mb-2 pl-2 text-sm"> Linkedin</span>
                <input
                  name="linkedin"
                  aria-label="Linkedin"
                  aria-required="true"
                  value={values.linkedin}
                  onChange={handleChange}
                  placeholder="Linkedin Url"
                  onBlur={handleBlur}
                  className={`w-full rounded-[6px] border-[2px] bg-transparent p-4 text-base text-black outline-2 -outline-offset-2 transition-all duration-100  focus-within:border-transparent focus-within:outline  dark:text-gray-400 dark:hover:border-gray-400 ${errors.linkedin && touched.linkedin ? " border-red-500 outline-red-500 hover:border-red-600 dark:hover:border-red-600" : "border-gray-400 outline-cyan-500 hover:border-gray-900 focus-within:hover:border-transparent"}`}
                />
                {touched.linkedin && errors.linkedin && (
                  <div className="absolute left-4 text-sm font-light text-red-500">
                    {errors.linkedin}
                  </div>
                )}
              </div>

              <div className="relative mb-6 w-full">
                <span className="mb-2 pl-2 text-sm"> Instagram</span>
                <input
                  name="instagram"
                  aria-label="Instagram"
                  aria-required="true"
                  value={values.instagram}
                  onChange={handleChange}
                  placeholder="Instagram Url"
                  onBlur={handleBlur}
                  className={`w-full rounded-[6px] border-[2px] bg-transparent p-4 text-base text-black outline-2 -outline-offset-2 transition-all duration-100  focus-within:border-transparent focus-within:outline  dark:text-gray-400 dark:hover:border-gray-400 ${errors.instagram && touched.instagram ? " border-red-500 outline-red-500 hover:border-red-600 dark:hover:border-red-600" : "border-gray-400 outline-cyan-500 hover:border-gray-900 focus-within:hover:border-transparent"}`}
                />
                {touched.instagram && errors.instagram && (
                  <div className="absolute left-4 text-sm font-light text-red-500">
                    {errors.instagram}
                  </div>
                )}
              </div>

              <div className="relative mb-6 w-full">
                <span className="mb-2 pl-2 text-sm"> Twitter</span>
                <input
                  name="twitter"
                  aria-label="Twitter"
                  aria-required="true"
                  value={values.twitter}
                  onChange={handleChange}
                  placeholder="Twitter Url"
                  onBlur={handleBlur}
                  className={`w-full rounded-[6px] border-[2px] bg-transparent p-4 text-base text-black outline-2 -outline-offset-2 transition-all duration-100  focus-within:border-transparent focus-within:outline  dark:text-gray-400 dark:hover:border-gray-400 ${errors.twitter && touched.twitter ? " border-red-500 outline-red-500 hover:border-red-600 dark:hover:border-red-600" : "border-gray-400 outline-cyan-500 hover:border-gray-900 focus-within:hover:border-transparent"}`}
                />
                {touched.twitter && errors.twitter && (
                  <div className="absolute left-4 text-sm font-light text-red-500">
                    {errors.twitter}
                  </div>
                )}
              </div>

              <div className="my-6 md:flex md:gap-6">
                <button
                  disabled={disable}
                  onClick={() => {
                    resetForm()
                    setShowModal(false)
                  }}
                  className="mb-2 w-full rounded-lg bg-red-500 py-4 text-center text-white hover:bg-red-400"
                >
                  Cancel
                </button>
                <button
                  disabled={disable}
                  type="submit"
                  className="mb-2 w-full rounded-lg bg-cyan-500 py-4 text-center text-white hover:bg-cyan-400"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </Formik>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          theme="light"
        />
      </div>
    </div>
  )
}

export default EditModal
