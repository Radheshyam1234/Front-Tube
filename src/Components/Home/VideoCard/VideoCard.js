import React from "react";
import { Link } from "react-router-dom";
import { truncateString } from "../../../utilities/turncateString";
import { VideocardActionBtn } from "./VideocardActionBtn";

import "./VideoCard.css";

export const VideoCard = ({ video }) => {
  return (
    <div className="card-vertical ">
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
          <div className="avatar xsm-avatar">
            <img
              loading="lazy"
              className="responsive-img"
              src={video.channelImageURL}
              alt="pic"
            />
          </div>
          <div className=" video-title text-medium text-semibold">
            {truncateString(video.title, 16)}
          </div>

          <VideocardActionBtn video={video} />
        </div>
        <div>
          <div className="text-medium text-semibold secondary-text-color">
            {video.channelName}
          </div>
        </div>
      </div>
    </div>
  );
};
