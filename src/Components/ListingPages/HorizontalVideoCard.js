import React from "react";
import { Link } from "react-router-dom";

import { removeFromPlaylist } from "../../utilities/backendRequest";
import { useStateContext } from "../../Context/StateContext/StateProvider";
import { useToast } from "../../Context/ToastContext/ToastProvider";
import "./styles.css";

export const HorizontalVideoCard = ({ videoItem, type, playlistId }) => {
  const { state, dispatch } = useStateContext();
  const { toastMsg, setToastMsg } = useToast();
  const { video, date: timeStamp } = videoItem;

  return (
    <div className="horizontal-card">
      <div className="card-horizontal">
        <Link to={`/watch/${video._id}`}>
          <div className="card-img">
            <img
              loading="lazy"
              src={video.thumbnail}
              alt="Nature"
              className="img-responsive"
            />
          </div>
        </Link>

        <div className="card-details">
          <p className="text-bold text-medium"> {video.title}</p>
          <p>
            <i className="far fa-clock"></i>{" "}
            <span className="ml-1 text-small  ">
              {timeStamp.replace("GMT+0530 (India Standard Time)", "")}
            </span>
          </p>
          <div>
            <p className="text-bold text-small secondary-text-color">
              {video.channelName}
            </p>
          </div>
        </div>

        <button
          className="btn"
          onClick={() => {
            removeFromPlaylist({
              dispatch,
              video,
              playlistId,
              type,
              setToastMsg,
            });
          }}
        >
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
};
