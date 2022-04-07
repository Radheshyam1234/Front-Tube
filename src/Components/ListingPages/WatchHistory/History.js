import React from "react";
import "../styles.css";

import { useStateContext } from "../../../Context/StateContext/StateProvider";
import { HistoryVideoCard } from "./HistoryVideoCard";

export const History = () => {
  const {
    state: { watchHistory },
  } = useStateContext();

  const length = watchHistory.length;
  return (
    <div className="likedVideos-container">
      <div class="grid-30-70-layout">
        <div className="playlist-details-container">
          <img
            loading="lazy"
            src={
              length
                ? watchHistory[length - 1].thumbnail
                : "https://res.cloudinary.com/radheshyam11/image/upload/v1649268374/images_r83ara.png"
            }
            alt="Nature"
            class="img-responsive"
          />
          <div className="playlist-details-text">
            <h4>Liked Videos</h4>
            <p>{length ? length : "No "} videos </p>
          </div>
        </div>
        <div>
          {length &&
            watchHistory
              .slice()
              .reverse()
              .map((video) => {
                return <HistoryVideoCard video={video} key={video._id} />;
              })}
        </div>
      </div>
    </div>
  );
};
