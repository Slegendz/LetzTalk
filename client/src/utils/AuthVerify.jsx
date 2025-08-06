import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { setLogout, setLogin } from "../redux/authSlice"
import { useSelector, useDispatch } from "react-redux"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const AuthVerify = () => {
  const token = useSelector((state) => state.token)

  let location = useLocation()
  const dispatch = useDispatch()

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]))
    } catch (e) {
      return null
    }
  }

  const refreshToken = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/auth/refresh`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        dispatch(setLogin({ user: data.foundUser, token: data.accessToken }));
        return true;
      } else {
        console.error("Failed to refresh token:", response.status);
        return false;
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      return false;
    }
  };

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        const decodedJwt = parseJwt(token);
        
        if (decodedJwt && decodedJwt.exp * 1000 < Date.now()) {
          const newToken = await refreshToken();
          
          if (newToken) {
            console.log("New access token created");
          } else {
            toast.info("Session Expired. Login again!", {
              position: "top-center",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            setTimeout(() => {
              dispatch(setLogout());
            }, 4500);
          }
        }
      }
    };
    verifyToken();
  }, [location, token, dispatch]);

  return (
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  )
}

export default AuthVerify
