import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../Context/StateContext/StateProvider";
import { useToast } from "../../../Context/ToastContext/ToastProvider";
import { copyToClipboard } from "../../../utilities/copylink";
import {
  isPresentInLikedVideos,
  isPresentInwatchLater,
} from "../../../utilities/array-manipulation";
import {
  addToPlaylist,
  removeFromPlaylist,
} from "../../../utilities/backendRequest";

export const VideocardActionBtn = ({ video }) => {
  const { state, dispatch } = useStateContext();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { toastMsg, setToastMsg } = useToast();
  const [openDialogue, setOpenDialogue] = useState(false);

  return (
    <div>
      <div
        onClick={() => {
          setOpenDialogue(!openDialogue);
        }}
      >
        <i className="fas fa-ellipsis-v option-icon"></i>
      </div>

      {openDialogue && (
        <div className="playlist-dialogue-container box-shadow">
          <div className=" playlist-dialogue-container-child">
            <span
              onClick={() => {
                copyToClipboard(video, setOpenDialogue);
              }}
            >
              <i className="far fa-copy"></i>
              Copy link
            </span>
          </div>

          <div className="playlist-dialogue-container-child">
            <span
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
                        setOpenDialogue,
                        setToastMsg,
                      })
                    : addToPlaylist({
                        playlistId: state?.watchLater?._id,
                        video,
                        type: "SET_WATCH_LATER",
                        dispatch,
                        setOpenDialogue,
                        setToastMsg,
                      });
                }
              }}
            >
              <i
                className={
                  isPresentInwatchLater(state, video._id)
                    ? "fas fa-check-circle text-success"
                    : "fas fa-plus-circle"
                }
              ></i>{" "}
              Watchlater
            </span>
          </div>

          <div className=" playlist-dialogue-container-child">
            <span
              onClick={() => {
                if (!token) {
                  navigate("/login");
                } else {
                  isPresentInLikedVideos(state, video._id)
                    ? removeFromPlaylist({
                        playlistId: state?.likedVideos?._id,
                        video,
                        type: "SET_LIKED_VIDEOS",
                        dispatch,
                        setOpenDialogue,
                        setToastMsg,
                      })
                    : addToPlaylist({
                        playlistId: state?.likedVideos?._id,
                        video,
                        type: "SET_LIKED_VIDEOS",
                        dispatch,
                        setOpenDialogue,
                        setToastMsg,
                      });
                }
              }}
            >
              <i
                className={
                  isPresentInLikedVideos(state, video._id)
                    ? "fas fa-check-circle text-success"
                    : "fas fa-plus-circle"
                }
              ></i>{" "}
              Liked Videos
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
