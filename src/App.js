import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { useVideosDataProvider } from "./Context/VideosDataContext/VideosDataProvider";
import { useStateContext } from "./Context/StateContext/StateProvider";
import {
  Home,
  Navbar,
  VideoDetailPage,
  Login,
  SignUp,
  MyProfile,
  Setting,
} from "./Components";
import { getVideos, getLikedVideos } from "./utilities/backendRequest";

import "./styles.css";

export const App = () => {
  const navigate = useNavigate();
  const { setVideosList } = useVideosDataProvider();
  const { state, dispatch } = useStateContext();
  const token = localStorage.getItem("token");

  useEffect(() => {
    getVideos(setVideosList);
    if (token) {
      getLikedVideos(state, dispatch);
      navigate("/");
    }
  }, []);

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
        <Route path="/myprofile/settings" element={<Setting />}></Route>
      </Routes>
    </div>
  );
};
