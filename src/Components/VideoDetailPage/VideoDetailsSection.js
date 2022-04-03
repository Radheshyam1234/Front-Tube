import React, { useState } from "react";
import { truncateString } from "../../utilities/turncateString";
import "./video-detail-page.css";

export const VideoDetailsSection = ({ video }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  return (
    <>
      <div className="video-details-section">
        <div className="video-info-container">
          <p className="text-large text-semibold">{video?.title}</p>
          <div className="video-action-button-container">
            <button className="btn large-btn video-action-button">
              <i className="far fa-thumbs-up btn-icon"></i>
            </button>
            <button className="btn large-btn video-action-button">
              <i class="fas fa-folder-plus"></i>
            </button>
            <button className="btn large-btn video-action-button">
              <i className="far fa-clock text-large"></i>
            </button>
            <button className="btn large-btn video-action-button">
              <i class="far fa-edit"></i>
            </button>
            <button className="btn large-btn video-action-button">
              <i class="fas fa-share"></i>
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
          className="btn small-btn secondary-btn"
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
