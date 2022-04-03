import React from "react";
import "./VideoCard.css";
import { truncateString } from "../../../utilities/turncateString";

export const VideoCard = ({ video }) => {
  return (
    <div className="card-vertical box-shadow">
      <div className="card-img">
        <img
          loading="lazy"
          src={
            "https://res.cloudinary.com/radheshyam11/image/upload/v1648794737/videoimge1_r00qva.webp"
          }
          alt="Nature"
          className="img-responsive"
        />
      </div>
      <div className="video-info">
        <div className="video-description ">
          <div class="avatar xsm-avatar avatar-text">{video.creator[0]}</div>
          <div className=" video-title text-medium text-semibold">
            {truncateString(video.title, 16)}
          </div>
          <div>
            <i className="fas fa-ellipsis-v option-icon"></i>
          </div>
        </div>
        <div>
          <div className="text-small text-semibold secondary-text-color">
            {video.creator}
          </div>
          <div className="video-views text-small secondary-text-color ">
            1000 views
          </div>
        </div>
      </div>
    </div>
  );
};
