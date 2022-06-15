import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { useVideosDataProvider } from "./Context/VideosDataContext/VideosDataProvider";
import { useStateContext } from "./Context/StateContext/StateProvider";
import { useAuthProvider } from "./Context/AuthContext/AuthProvider";
import {
  Home,
  Navbar,
  VideoDetailPage,
  Login,
  SignUp,
  LikedVideo,
  MyProfile,
  Setting,
} from "./Components";
import {
  getVideos,
  getUserProfile,
  getPlaylists,
} from "./utilities/backendRequest";

import "./styles.css";

export const App = () => {
  const navigate = useNavigate();
  const { setVideosList } = useVideosDataProvider();
  const { state, dispatch } = useStateContext();
  const { setUserProfile, token, setToken, startTime } = useAuthProvider();

  useEffect(() => {
    getVideos(setVideosList);
    const encoded = localStorage.getItem("token");
    if (encoded) setToken(encoded);
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (token !== "") {
        getUserProfile(setUserProfile);
        getPlaylists(dispatch);
      }
    }
    fetchData();
  }, [token]);

  return (
    <div className="App">
      <Navbar />
      <div className="spacer-3rem"></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/watch/:id" element={<VideoDetailPage />} />
        <Route path="/myprofile" element={<MyProfile />}></Route>
        <Route path="/liked" element={<LikedVideo />}></Route>
        <Route path="/myprofile/settings" element={<Setting />}></Route>
      </Routes>
    </div>
  );
};
