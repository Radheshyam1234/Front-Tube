import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { useVideosDataProvider } from "./Context/VideosDataContext/VideosDataProvider";
import { useStateContext } from "./Context/StateContext/StateProvider";
import { useAuthProvider } from "./Context/AuthContext/AuthProvider";
import {
  Home,
  Navbar,
  Login,
  SignUp,
  SearchResultPage,
  VideoDetailPage,
  LikedVideo,
  History,
  WatchLater,
  Library,
  PlaylistVideos,
  AllPlaylists,
} from "./Components";
import {
  getVideos,
  getUserProfile,
  getPlaylists,
} from "./utilities/backendRequest";
import { PrivateRoute } from "./Components/PrivateRoute";

import "./styles.css";

export const App = () => {
  const { setVideosList } = useVideosDataProvider();
  const { dispatch } = useStateContext();
  const { setUserProfile, token, setToken } = useAuthProvider();

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
        <Route path="/search/:query" element={<SearchResultPage />} />

        <Route
          path="/liked"
          element={
            <PrivateRoute>
              <LikedVideo />
            </PrivateRoute>
          }
        />
        <Route
          path="/history"
          element={
            <PrivateRoute>
              <History />
            </PrivateRoute>
          }
        />

        <Route
          path="/watchlater"
          element={
            <PrivateRoute>
              <WatchLater />
            </PrivateRoute>
          }
        />
        <Route
          path="/library"
          element={
            <PrivateRoute>
              <Library />
            </PrivateRoute>
          }
        />

        <Route
          path="/playlists"
          element={
            <PrivateRoute>
              <AllPlaylists />
            </PrivateRoute>
          }
        />

        <Route
          path="/playlists/:playlistId"
          element={
            <PrivateRoute>
              <PlaylistVideos />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};
