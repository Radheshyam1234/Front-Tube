import React from "react";

import { useStateContext } from "../../../Context/StateContext/StateProvider";
import { HorizontalVideoCard } from "../HorizontalVideoCard";
import "../styles.css";

export const History = () => {
  const {
    state,
    state: {
      watchHistory: { videos },
    },
  } = useStateContext();

  return (
    <>
      {videos?.length ? (
        <div className="Videos-container">
          <div className="grid-30-70-layout">
            <div className="playlist-details-container">
              <img
                loading="lazy"
                src={videos[videos.length - 1].video.thumbnail}
                alt="Nature"
                className="img-responsive"
              />
              <div className="playlist-details-text">
                <h4>Your history</h4>
                <p>{videos.length} videos </p>
              </div>
            </div>
            <div>
              {videos
                .slice()
                .reverse()
                .map((videoItem) => {
                  return (
                    <HorizontalVideoCard
                      videoItem={videoItem}
                      type="SET_HISTORY"
                      playlistId={state.watchHistory._id}
                      key={videoItem._id}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      ) : (
        <div className="playlist-details-container w-30">
          <img
            loading="lazy"
            src={
              "https://res.cloudinary.com/radheshyam11/image/upload/v1649268374/images_r83ara.png"
            }
            alt="Nature"
            className="img-responsive"
          />
          <div className="playlist-details-text">
            <h4>Your history</h4>
            <p>No videos </p>
          </div>
        </div>
      )}
    </>
  );
};
