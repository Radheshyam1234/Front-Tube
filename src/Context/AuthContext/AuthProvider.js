import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [startTime, setStartTime] = useState(0);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsUserLoggedIn(true);
      setToken(token);
      setStartTime(new Date().getTime());
    }
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

  const loginUser = async ({ email, password, from }) => {
    try {
      const {
        data: { response },
        status,
      } = await axios({
        method: "POST",
        url: `http://localhost:8080/users/authenticate`,
        data: {
          email,
          password,
        },
      });

      if (status == 200 || 201) {
        localStorage.setItem("token", response.token);
        setToken(response.token);
        setIsUserLoggedIn(true);
        setUserProfile(response?.user);
        localStorage.setItem("user", JSON.stringify(response.user));
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logoutUser = () => {
    localStorage.clear();

    setToken("");
    setIsUserLoggedIn(false);
    setUserProfile(null);
    navigate("/");
    window.location.reload(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isUserLoggedIn,
        setIsUserLoggedIn,
        userProfile,
        setUserProfile,
        token,
        setToken,
        signupNewUser,
        loginUser,
        logoutUser,
        startTime,
        setStartTime,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthProvider = () => useContext(AuthContext);
