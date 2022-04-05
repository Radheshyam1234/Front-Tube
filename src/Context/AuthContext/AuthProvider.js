import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    token && setIsUserLoggedIn(true);
  }, []);

  const signupNewUser = async ({ email, password, firstName, lastName }) => {
    try {
      const res = await axios({
        method: "post",
        url: "/api/auth/signup",
        data: {
          email,
          password,
          firstName,
          lastName,
        },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const loginUser = async ({ email, password }) => {
    try {
      const {
        data: { foundUser, encodedToken },
        status,
      } = await axios.post(`/api/auth/login`, {
        email,
        password,
      });

      if (status == 200) {
        localStorage.setItem("token", encodedToken);
        setIsUserLoggedIn(true);
        setUserProfile(foundUser);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logoutUser = () => {
    localStorage.clear();
    setIsUserLoggedIn(false);
    setUserProfile(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        isUserLoggedIn,
        setIsUserLoggedIn,
        userProfile,
        setUserProfile,
        signupNewUser,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthProvider = () => useContext(AuthContext);
