import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../utilities/ApiUrl";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsUserLoggedIn(true);
      setToken(token);
    }
  }, []);

  const signupNewUser = async ({ email, password, firstName, lastName }) => {
    try {
      const {
        data: { foundUser, encodedToken },
        status,
      } = await axios({
        method: "post",
        url: `${API_URL}/users`,
        data: {
          email,
          password,
          firstName,
          lastName,
        },
      });
      if (status == 200) {
        localStorage.setItem("token", encodedToken);
        localStorage.setItem("data", JSON.stringify(foundUser));
        setIsUserLoggedIn(true);
        setUserProfile(foundUser);
        navigate("/");
      }
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
        url: `${API_URL}/users/authenticate`,
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthProvider = () => useContext(AuthContext);
