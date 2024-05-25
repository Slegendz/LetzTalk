import React, { useState } from "react"
import { Formik } from "formik"
import * as yup from "yup"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { setLogin } from "../../redux/authSlice.jsx"
// Yup is a schema builder for runtime value parsing and validation. Define a schema, transform a value to match, assert the shape of an existing value, or both. Yup schema are extremely expressive and allow modeling complex, interdependent validations, or value transformation.

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
  coverImage: yup.string(),
})

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
})

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
  coverImage: "",
}

const initialValuesLogin = {
  email: "",
  password: "",
}

const Form = () => {
  const [pageType, setPageType] = useState("register")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLogin = pageType === "login"
  const isRegister = pageType === "register"
  let isMobile = window.innerWidth <= 768

  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData()
    for (let value in values) {
      formData.append(value, values[value])
    }
    formData.append("picturePath", values.picture.name)

    if(values.coverImage) formData.append("coverImagePath", values.coverImage.name)
    else formData.append("coverImagePath", "");

    const savedUserResponse = await fetch(
      `${process.env.REACT_APP_BASE_URL}/auth/register`,
      {
        method: "POST",
        body: formData,
      }
    )
    const savedUser = await savedUserResponse.json()
    onSubmitProps.resetForm()

    if (savedUser) {
      setPageType("login")
    }
  }

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
    const loggedIn = await loggedInResponse.json()

    onSubmitProps.resetForm()

    if (loggedInResponse.ok) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      )
      navigate("/home")
    } else {
      toast.error("Email or password is Incorrect", {
        position: "top-right",
        autoClose: 3000,
        newestOnTop: true,
        theme: "light",
        hideProgressBar: false,
      })
    }
  }

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps)
    if (isRegister) await register(values, onSubmitProps)
  }

  return (
    <>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
        validationSchema={isLogin ? loginSchema : registerSchema}
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
          <form onSubmit={handleSubmit}>
            <div>
              {isRegister && (
                <>
                  <div className="md:flex md:gap-6">
                    <div className="relative mb-6 w-full">
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
                          {" "}
                          {errors.firstName}{" "}
                        </div>
                      )}
                    </div>

                    <div className="relative mb-6 w-full">
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
                          {" "}
                          {errors.lastName}{" "}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="relative mb-6 w-full">
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
                        {" "}
                        {errors.occupation}{" "}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="md:flex md:gap-3">
              {isRegister && (
                <label
                  htmlFor="file-upload1"
                  className="mb-6 flex min-w-[200px] cursor-pointer rounded-lg bg-grey-800  p-4 px-4 text-base font-semibold text-white outline-none focus-within:outline-none hover:text-slate-200 dark:bg-white dark:text-indigo-600 hover:dark:text-indigo-500"
                >
                  <input
                    id="file-upload1"
                    className="sr-only"
                    name="file-upload1"
                    type="file"
                    accept=".png, .jpg, .jpeg, .gif"
                    onChange={(e) => {
                      setFieldValue("picture", e.target.files[0])
                    }}
                  />
                  <span className="flex w-full md:items-center md:justify-center">
                    {!values.picture
                      ? "Upload a file ( PNG, JPG, GIF )"
                      : !isMobile && values.picture.name.length > 15
                        ? values.picture.name.substring(0, 15) + "..."
                        : values.picture.name}
                  </span>
                </label>
              )}

              <div className="relative mb-6 w-full">
                <input
                  name="email"
                  aria-label="Email"
                  aria-required="true"
                  value={values.email}
                  type="email"
                  onChange={handleChange}
                  placeholder="Email"
                  onBlur={handleBlur}
                  className={`w-full rounded-[6px] border-[2px] bg-transparent p-4 text-base text-black outline-2 -outline-offset-2 transition-all duration-100  focus-within:border-transparent focus-within:outline  dark:text-gray-400 dark:hover:border-gray-400 ${errors.email && touched.email ? " border-red-500 outline-red-500 hover:border-red-600 dark:hover:border-red-600" : "border-gray-400 outline-cyan-500 hover:border-gray-900 focus-within:hover:border-transparent"}`}
                />
                {touched.email && errors.email && (
                  <div className="absolute left-4 text-sm font-light text-red-500">
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="relative mb-6 w-full">
                <input
                  name="password"
                  aria-label="Password"
                  aria-required="true"
                  value={values.password}
                  type="password"
                  onChange={handleChange}
                  placeholder="Password"
                  onBlur={handleBlur}
                  className={`w-full rounded-[6px] border-[2px] bg-transparent p-4 text-base text-black outline-2 -outline-offset-2 transition-all duration-100  focus-within:border-transparent focus-within:outline  dark:text-gray-400 dark:hover:border-gray-400 ${errors.password && touched.password ? " border-red-500 outline-red-500 hover:border-red-600 dark:hover:border-red-600" : "border-gray-400 outline-cyan-500 hover:border-gray-900 focus-within:hover:border-transparent"}`}
                />
                {touched.password && errors.password && (
                  <div className="absolute left-4 text-sm font-light text-red-500">
                    {errors.password}
                  </div>
                )}
              </div>
            </div>

            {isRegister && (
              <label
                htmlFor="file-upload2"
                className="mb-6 mt-2 flex w-full min-w-[200px] cursor-pointer rounded-lg bg-grey-800 p-4 px-4 text-base font-semibold text-white outline-none focus-within:outline-none hover:text-slate-200 dark:bg-white dark:text-indigo-600 hover:dark:text-indigo-500"
              >
                <input
                  id="file-upload2"
                  className="sr-only"
                  name="file-upload2"
                  type="file"
                  accept=".png, .jpg, .jpeg, .gif"
                  onChange={(e) => {
                    setFieldValue("coverImage", e.target.files[0])
                  }}
                />
                <span className="flex w-full md:items-center md:justify-center">
                  {!values.coverImage
                    ? "Add Cover Image"
                    : !isMobile && values.coverImage.name.length > 15
                      ? values.coverImage.name.substring(0, 15) + "..."
                      : values.coverImage.name}
                </span>
              </label>
            )}

            {/* BUTTONS */}
            <div className="w-full">
              <button
                type="submit"
                className="my-8 block w-full rounded-lg bg-cyan-500 py-4 text-white hover:bg-cyan-400"
              >
                {isLogin ? "LOGIN" : "REGISTER"}
              </button>
              <p
                onClick={() => {
                  setPageType(isLogin ? "register" : "login")
                  resetForm()
                }}
                className="inline-block cursor-pointer text-primary-600 underline hover:text-primary-500"
              >
                {isLogin
                  ? "Don't have an account? Sign Up here."
                  : "Already have an account? Login here."}
              </p>
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
    </>
  )
}

export default Form
