import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { useVideosDataProvider } from "./Context/VideosDataContext/VideosDataProvider";
import { useStateContext } from "./Context/StateContext/StateProvider";
import { useAuthProvider } from "./Context/AuthContext/AuthProvider";
import { useToast } from "./Context/ToastContext/ToastProvider";
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
  ProfilePage,
  MyProfile,
  Setting,
} from "./Components";
import { Toast } from "./Components/Toast/Toast";
import {
  getVideos,
  getUserProfile,
  getPlaylists,
} from "./utilities/backendRequest";
import { PrivateRoute } from "./Components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

export const App = () => {
  const { setVideosList } = useVideosDataProvider();
  const { dispatch } = useStateContext();
  const { setUserProfile, token, setToken } = useAuthProvider();
  const { toastMsg } = useToast();

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
      <ToastContainer
        position="top-center"
        autoClose="1800"
        limit="2"
        style={{ top: "15em" }}
        icon={false}
      />
      {toastMsg.msg && <Toast {...toastMsg} />}

      <div className="spacer-3rem"></div>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/myprofile" element={<MyProfile />}></Route> */}
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

        <Route
          path="/myprofile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        >
          <Route
            index
            element={
              <PrivateRoute>
                <MyProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="settings"
            element={
              <PrivateRoute>
                <Setting />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
};
