import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

import { LikedVideoCard } from "./LikedVideoCard";
import { useStateContext } from "../../../Context/StateContext/StateProvider";

export const LikedVideo = () => {
  const {
    state: { likedVideos },
  } = useStateContext();
  const length = likedVideos.length;

  return (
    <div className="likedVideos-container">
      <div class="grid-30-70-layout">
        <div className="playlist-details-container">
          <img
            loading="lazy"
            src={
              length
                ? likedVideos[length - 1].thumbnail
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
            likedVideos
              .slice()
              .reverse()
              .map((video) => {
                return <LikedVideoCard video={video} key={video._id} />;
              })}
        </div>
      </div>
    </div>
  );
};
