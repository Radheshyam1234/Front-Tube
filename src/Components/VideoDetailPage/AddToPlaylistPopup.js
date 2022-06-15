import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  isPresentInwatchLater,
  isPresentInPlaylist,
} from "../../utilities/array-manipulation";
import {
  addToPlaylist,
  removeFromPlaylist,
  createNewPlaylist,
} from "../../utilities/backendRequest";
import { useStateContext } from "../../Context/StateContext/StateProvider";
import { useAuthProvider } from "../../Context/AuthContext/AuthProvider";

import "./video-detail-page.css";

export const AddToPlaylistPopup = ({ video, setSaveToPlaylist }) => {
  const navigate = useNavigate();
  const { state, dispatch } = useStateContext();
  const { token } = useAuthProvider();

  const [addPlaylistInput, setaddPlaylistInput] = useState(false);
  const [playlistName, setPlaylistName] = useState("");

  window.onclick = (e) => {
    if (e.target.id == "modal") {
      setSaveToPlaylist(false);
      setaddPlaylistInput(false);
    }
  };

  const createPlaylistHandler = (e) => {
    e.preventDefault();
    createNewPlaylist({
      token,
      dispatch,
      video,
      name: playlistName,
    });
    setaddPlaylistInput(false);
    setSaveToPlaylist(false);
  };
  return (
    <div id="modal" className="modal">
      <div className="modal-content">
        <p> Save to...</p>
        <span className="divider-line"></span>
        <span
          className="modal-close"
          onClick={() => {
            setSaveToPlaylist(false);
            setaddPlaylistInput(false);
          }}
        >
          &times;
        </span>

        <li
          className="list-style-none"
          onClick={() => {
            if (!token) {
              navigate("/login");
            } else {
              isPresentInwatchLater(state, video._id)
                ? removeFromPlaylist({
                    playlistId: state?.watchLater?._id,
                    video,
                    type: "SET_WATCH_LATER",
                    dispatch,
                  })
                : addToPlaylist({
                    playlistId: state?.watchLater?._id,
                    video,
                    type: "SET_WATCH_LATER",
                    dispatch,
                  });
            }
          }}
        >
          <i
            className={`mr-1  ${
              isPresentInwatchLater(state, video._id)
                ? "fas fa-check-circle text-success"
                : "fas fa-plus-circle"
            }`}
          ></i>{" "}
          Watchlater
        </li>

        {state.playlists.map((playlist) => {
          return (
            <li
              className="list-style-none"
              key={playlist._id}
              onClick={() => {
                if (!token) {
                  navigate("/login");
                } else {
                  isPresentInPlaylist(playlist, video)
                    ? removeFromPlaylist({
                        playlistId: playlist._id,
                        video,
                        type: "UPDATE_PLAYLIST",
                        dispatch,
                      })
                    : addToPlaylist({
                        playlistId: playlist._id,
                        video,
                        type: "UPDATE_PLAYLIST",
                        dispatch,
                      });
                }
              }}
            >
              <i
                className={` mr-1 ${
                  isPresentInPlaylist(playlist, video)
                    ? "fas fa-check-circle text-success"
                    : "fas fa-plus-circle"
                } `}
              ></i>
              {playlist.name}
            </li>
          );
        })}
        <li
          className="list-style-none primary-text-color text-bold"
          onClick={() => setaddPlaylistInput(true)}
        >
          <i className="fas fa-plus-circle mr-1"></i>Create Playlist
        </li>
        <span className="divider-line"></span>

        {addPlaylistInput && (
          <div>
            <form onSubmit={createPlaylistHandler}>
              <input
                className=" form-field"
                type="text"
                value={playlistName}
                placeholder="Enter playlist name"
                onChange={(e) => {
                  setPlaylistName(e.target.value);
                }}
                required
                autoFocus
              />
              <button type="submit" className="btn primary-btn-outline">
                Create
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
