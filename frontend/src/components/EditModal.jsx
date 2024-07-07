import React, { useEffect, useState, useRef } from "react"
import { IoMdArrowRoundBack } from "react-icons/io"
import "animate.css"
import { LiaUserEditSolid } from "react-icons/lia"
import { Formik } from "formik"
import * as yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { setUserPic } from "../redux/authSlice"

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
    linkedinUrl
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

  const InputField = ({
    name,
    value,
    onChange,
    onBlur,
    errors,
    type,
    touched,
  }) => (
    <div className="relative mb-4 w-full">
      <span className="mb-2 pl-2 text-sm">
        {name[0].toUpperCase() + name.slice(1).toLowerCase()}
      </span>

      <input
        name={name}
        value={value}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full rounded-[6px] border-[2px] bg-transparent p-4 text-base text-black outline-2 -outline-offset-2 transition-all duration-100  focus-within:border-transparent focus-within:outline  dark:text-gray-400 dark:hover:border-gray-400 ${errors[name] && touched[name] ? " border-red-500 outline-red-500 hover:border-red-600 dark:hover:border-red-600" : "border-gray-400 outline-cyan-500 hover:border-gray-900"}`}
      />
      {touched[name] && errors[name] && (
        <div className="absolute left-4 text-sm font-light text-red-500">
          {errors[name]}
        </div>
      )}
    </div>
  )

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
    formData.append("id", _id)

    for (let value in values) {
      formData.append(value, values[value])
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
      toast.success("User Updated", {
        position: "top-right",
        autoClose: 3000,
        newestOnTop: true,
        theme: "light",
        hideProgressBar: false,
      })
      setTimeout(() => {
        setShowModal(false)
      }, 1000);
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
            setFieldValue,
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
                <InputField
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  onBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                />

                <InputField
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  onBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                />
              </div>

              <InputField
                name="location"
                value={values.location}
                onChange={handleChange}
                placeholder="Location"
                onBlur={handleBlur}
                errors={errors}
                touched={touched}
              />

              <InputField
                name="occupation"
                value={values.occupation}
                onChange={handleChange}
                placeholder="Occupation"
                onBlur={handleBlur}
                errors={errors}
                touched={touched}
              />

              <InputField
                name="linkedin"
                value={values.linkedin}
                onChange={handleChange}
                placeholder="Linkedin Url"
                onBlur={handleBlur}
                errors={errors}
                touched={touched}
              />

              <InputField
                name="instagram"
                value={values.instagram}
                onChange={handleChange}
                placeholder="Instagram Url"
                onBlur={handleBlur}
                errors={errors}
                touched={touched}
              />

              <InputField
                name="twitter"
                value={values.twitter}
                onChange={handleChange}
                placeholder="Twitter Url"
                onBlur={handleBlur}
                errors={errors}
                touched={touched}
              />

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
