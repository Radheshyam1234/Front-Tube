import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { useVideosDataProvider } from "./Context/VideosDataContext/VideosDataProvider";

import {
  Home,
  Navbar,
  VideoDetailPage,
  Login,
  SignUp,
  MyProfile,
  Setting,
} from "./Components";
import { getVideos } from "./utilities/backendRequest";

import "./styles.css";

export const App = () => {
  const { setVideosList } = useVideosDataProvider();
  useEffect(() => {
    getVideos(setVideosList);
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
