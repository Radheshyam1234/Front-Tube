import React from "react";
import { Link } from "react-router-dom";
import { useUserActions } from "../../utils/useUserActions";
import "../styles.css";

export const HistoryVideoCard = ({ video }) => {
  const { removeFromWatchHistory } = useUserActions();
  return (
    <div className="likedVideocard">
      <div class="card-horizontal">
        <Link to={`/watch/${video._id}`}>
          <div class="card-img">
            <img
              loading="lazy"
              src={video.thumbnail}
              alt="Nature"
              class="img-responsive"
            />
          </div>
        </Link>

        <div class="card-details">
          <p className="text-bold text-medium"> {video.title}</p>
          <div>
            <p className="text-bold text-small secondary-text-color">
              {video.creator}
            </p>
          </div>
        </div>

        <button
          className="btn"
          onClick={() => {
            removeFromWatchHistory(video);
          }}
        >
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
};
