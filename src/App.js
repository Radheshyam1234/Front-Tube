import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { useVideosDataProvider } from "./Context/VideosDataContext/VideosDataProvider";
import { useStateContext } from "./Context/StateContext/StateProvider";
import { useAuthProvider } from "./Context/AuthContext/AuthProvider";
import { Home, Navbar, Login, SignUp, LikedVideo } from "./Components";
import {
  getVideos,
  getUserProfile,
  getLikedVideos,
} from "./utilities/backendRequest";
import { PrivateRoute } from "./Components/PrivateRoute";

import "./styles.css";

export const App = () => {
  const navigate = useNavigate();
  const { setVideosList } = useVideosDataProvider();
  const { state, dispatch } = useStateContext();
  const { setUserProfile } = useAuthProvider();
  const token = localStorage.getItem("token");

  useEffect(() => {
    getVideos(setVideosList);
    if (token) {
      getUserProfile(setUserProfile);
      getLikedVideos(dispatch);
    }
  }, [token]);

  return (
    <div className="App">
      <Navbar />
      <div className="spacer-3rem"></div>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route
          path="/liked"
          element={
            <PrivateRoute>
              <LikedVideo />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};
