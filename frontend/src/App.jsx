import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import React, { lazy, Suspense } from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import "animate.css"
import useUserActiveStatus from "./hooks/useUserActiveStatus.js"
import useWindowSize from "./hooks/useWindowSize.js"
import LetzTalk from "./assets/LetzTalk.mp4"
import AuthVerify from "./utils/AuthVerify.js"

const ProfilePage = lazy(
  () => import("./containers/ProfilePage/ProfilePage.jsx")
)
const Missing = lazy(() => import("./containers/Missing/Missing.jsx"))
const Homepage = lazy(() => import("./containers/Homepage/Homepage.jsx"))
const LoginPage = lazy(() => import("./containers/LoginPage/LoginPage.jsx"))
const Messenger = lazy(() => import("./containers/Messenger.jsx"))

const FallbackLoader = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#ffffff",
    }}
  >
    <video
      width="500"
      height="500"
      autoPlay
      loop
      muted
      className="pointer-events-none z-10"
    >
      <source src={LetzTalk} type="video/mp4" />
    </video>
  </div>
)

function App() {
  // Using useMemo for optimization, we can achieve similar results with useEffect but that will be less efficient.
  // it will only cache the state when mode is changed.
  const isAuth = Boolean(useSelector((state) => state.token))
  const { logoutUser } = useUserActiveStatus()
  const windowSize = useWindowSize()

  return (
    <div className="font-Rubik">
      <Router>
        <Suspense fallback={<FallbackLoader />}>
          <Routes>
            <Route path="/" element={<LoginPage />} />

            {/* <Route element={<Prefetch />}> */}
              <Route
                path="/home"
                element={
                  isAuth ? (
                    <Homepage logoutUser={logoutUser} />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/profile/:userId"
                element={
                  isAuth ? (
                    <ProfilePage logoutUser={logoutUser} />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/messenger"
                element={
                  isAuth ? (
                    <Messenger
                      logoutUser={logoutUser}
                      windowSize={windowSize}
                    />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
            {/* </Route> */}
            <Route path="*" element={<Missing />} />
          </Routes>
        </Suspense>
        <AuthVerify />
      </Router>
    </div>
  )
}

export default App
