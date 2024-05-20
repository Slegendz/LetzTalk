import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import React, { useMemo, lazy, Suspense, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Navigate } from "react-router-dom"
import "animate.css"
import ProfilePage from "./containers/ProfilePage/ProfilePage"
import Missing from "./containers/Missing/Missing"
import Homepage from "./containers/Homepage/Homepage"
import LoginPage from "./containers/LoginPage/LoginPage"
import Messenger from "./containers/Messenger"
import useUserActiveStatus from "./hooks/useUserActiveStatus.js"
import useWindowSize from "./hooks/useWindowSize.js"

function App() {
  
  // Using useMemo for optimization, we can achieve similar results with useEffect but that will be less efficient.
  // it will only cache the state when mode is changed.
  const isAuth = Boolean(useSelector((state) => state.token))
  const { logoutUser } = useUserActiveStatus();
  const windowSize = useWindowSize();

  return (
    <div className="font-Rubik">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/home"
            element={isAuth ? <Homepage logoutUser = {logoutUser} /> : <Navigate to="/" />}
          />
          <Route
            path="/profile/:userId"
            element={isAuth ? <ProfilePage logoutUser = {logoutUser} /> : <Navigate to="/" />}
          />
          <Route
            path="/messenger"
            element={
              isAuth ? (
                <Messenger logoutUser = {logoutUser} windowSize = {windowSize} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route path="*" element={<Missing />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
