import React, { useState } from "react";
import { truncateString } from "../../utilities/turncateString";
import { useUserActions } from "../utils/useUserActions";
import "./video-detail-page.css";

export const VideoDetailsSection = ({ video }) => {
  const { isPresentInLikedVideos, addToLikedVideos, removeFromLikedVideos } =
    useUserActions();
  const [showFullDescription, setShowFullDescription] = useState(false);
  return (
    <>
      <div className="video-details-section">
        <div className="video-info-container">
          <p className="text-large text-semibold">{video?.title}</p>
          <div className="video-action-button-container">
            {isPresentInLikedVideos(video) ? (
              <button
                className="btn large-btn video-action-button"
                onClick={() => {
                  removeFromLikedVideos(video._id);
                }}
              >
                <i class="fas fa-thumbs-up"></i>
              </button>
            ) : (
              <button
                className="btn large-btn video-action-button"
                onClick={() => {
                  addToLikedVideos(video);
                }}
              >
                <i class="far fa-thumbs-up"></i>
              </button>
            )}

            <button className="btn large-btn video-action-button">
              <i className="fas fa-folder-plus"></i>
            </button>
            <button className="btn large-btn video-action-button">
              <i className="far fa-clock text-large"></i>
            </button>
            <button className="btn large-btn video-action-button">
              <i className="far fa-edit"></i>
            </button>
            <button className="btn large-btn video-action-button">
              <i className="fas fa-share"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="divider-line"></div>
      <div className="video-uploader-details">
        <div class="avatar xsm-avatar avatar-text">{video.creator[0]}</div>
        <div className="video-uploader-name text-bold">{video.creator}</div>
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
  );
};
