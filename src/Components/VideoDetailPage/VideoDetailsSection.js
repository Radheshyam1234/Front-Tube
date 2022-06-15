import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { truncateString } from "../../utilities/turncateString";
import { useStateContext } from "../../Context/StateContext/StateProvider";

import {
  addToPlaylist,
  removeFromPlaylist,
} from "../../utilities/backendRequest";
import {
  isPresentInLikedVideos,
  isPresentInwatchLater,
} from "../../utilities/array-manipulation";

import "./video-detail-page.css";
import { AddToPlaylistPopup } from "./AddToPlaylistPopup";
import { copyToClipboard } from "../../utilities/copylink";

export const VideoDetailsSection = ({ video }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [saveToPlaylist, setSaveToPlaylist] = useState(false);
  const [processingVideo, setProcessingVideo] = useState(false);

  const { state, dispatch } = useStateContext();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  return (
    <>
      {state && (
        <>
          <div className="video-details-section">
            <div className="video-info-container">
              <p className="text-large text-semibold">{video?.title}</p>

              <div className="video-views text-small ">
                <span>
                  <b>{video.viewCount}</b> views{" "}
                </span>
                <span className="ml-1"> {video.publishDate} </span>
              </div>

              <div className="video-action-button-container">
                {isPresentInLikedVideos(state, video._id) ? (
                  <button
                    className={`btn large-btn video-action-button  ${
                      processingVideo ? "btn-disabled" : ""
                    }`}
                    onClick={() => {
                      if (!token) {
                        navigate("/login");
                      } else
                        removeFromPlaylist({
                          playlistId: state?.likedVideos?._id,
                          video,
                          type: "SET_LIKED_VIDEOS",
                          dispatch,
                          setProcessingVideo,
                        });
                    }}
                  >
                    <i className={`fas fa-thumbs-up btn-icon `}></i>
                  </button>
                ) : (
                  <button
                    className={`btn large-btn video-action-button  ${
                      processingVideo ? "btn-disabled" : ""
                    }`}
                    onClick={() => {
                      if (!token) {
                        navigate("/login");
                      } else
                        addToPlaylist({
                          playlistId: state?.likedVideos?._id,
                          video,
                          type: "SET_LIKED_VIDEOS",
                          dispatch,

                          setProcessingVideo,
                        });
                    }}
                  >
                    <i className="far fa-thumbs-up btn-icon"></i>
                  </button>
                )}

                <button
                  className="btn large-btn video-action-button"
                  onClick={() => {
                    setSaveToPlaylist(!saveToPlaylist);
                  }}
                >
                  <i className="fas fa-folder-plus"></i>
                </button>

                <div style={{ display: saveToPlaylist ? "block" : "none" }}>
                  <AddToPlaylistPopup
                    video={video}
                    setSaveToPlaylist={setSaveToPlaylist}
                  />
                </div>

                {state.watchLater.videos &&
                isPresentInwatchLater(state, video._id) ? (
                  <button
                    className={`btn large-btn video-action-button  ${
                      processingVideo ? "btn-disabled" : ""
                    }`}
                    onClick={() => {
                      if (!token) {
                        navigate("/login");
                      } else
                        removeFromPlaylist({
                          playlistId: state?.watchLater?._id,
                          video,
                          type: "SET_WATCH_LATER",
                          dispatch,

                          setProcessingVideo,
                        });
                    }}
                  >
                    <i className="fas fa-clock text-large"></i>
                  </button>
                ) : (
                  <button
                    className={`btn large-btn video-action-button  ${
                      processingVideo ? "btn-disabled" : ""
                    }`}
                    onClick={() => {
                      if (!token) {
                        navigate("/login");
                      } else
                        addToPlaylist({
                          playlistId: state?.watchLater?._id,
                          video,
                          type: "SET_WATCH_LATER",
                          dispatch,

                          setProcessingVideo,
                        });
                    }}
                  >
                    <i className="far fa-clock text-large"></i>
                  </button>
                )}

                <button
                  className={`btn large-btn video-action-button`}
                  onClick={() => {
                    copyToClipboard(video);
                  }}
                >
                  <i className="far fa-copy"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="divider-line"></div>
          <div className="video-uploader-details">
            <div className="avatar xsm-avatar">
              <img
                loading="lazy"
                className="responsive-img"
                src={video.channelImageURL}
                alt="pic"
              />
            </div>
            <div className="video-uploader-name text-bold">
              {video.channelName}
            </div>
          </div>
          <div className="divider-line"></div>
          <div className="video-description text-semibold text-medium">
            {showFullDescription
              ? video.description
              : truncateString(video.description, 100)}
            <button
              className="btn  secondary-btn"
              onClick={() => {
                setShowFullDescription((prev) => !prev);
              }}
            >
              {showFullDescription ? "SHOW LESS" : "SHOW MORE"}
            </button>
          </div>
        </>
      )}
    </>
  );
};
