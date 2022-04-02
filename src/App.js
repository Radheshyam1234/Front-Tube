import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useVideosDataProvider } from "./Context/VideosDataContext/VideosDataProvider";

import { Home, Navbar } from "./Components";

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
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};
