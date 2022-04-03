import React from "react";
import { Link } from "react-router-dom";
import "./VideoCard.css";
import { truncateString } from "../../../utilities/turncateString";

export const VideoCard = ({ video }) => {
  return (
    <div className="card-vertical box-shadow">
      <div className="card-img">
        <Link to={`/watch/${video._id}`}>
          <img
            loading="lazy"
            src={video.thumbnail}
            alt="Nature"
            className="img-responsive"
          />
        </Link>
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
