import React from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../../Context/StateContext/StateProvider";
import { VideoCard } from "../../Home/VideoCard/VideoCard";

import "./Library.css";

export const Library = () => {
  const {
    state: { likedVideos, watchHistory, watchLater, playlists },
  } = useStateContext();
  const Playlists = [
    {
      playlist: likedVideos,
      path: "liked",
    },
    {
      playlist: watchHistory,
      path: "history",
    },
    {
      playlist: watchLater,
      path: "watchlater",
    },
  ];

  return (
    <div className="library-page">
      {Playlists?.map((Playlist) => {
        return (
          <div key={Playlist.playlist._id}>
            <p className="text-semibold">
              {Playlist?.playlist?.type?.toUpperCase()} Videos (
              {Playlist?.playlist?.videos?.length})
              <Link to={`/${Playlist?.path}`}>
                <span className="right-float text-semibold">SEE ALL</span>
              </Link>
            </p>
            <div className="playlist-videos-container display-flex flex-wrap">
              {Playlist?.playlist?.videos?.slice(0, 4).map((Video) => {
                return <VideoCard video={Video.video} key={Video._id} />;
              })}
            </div>
            <p className="divider-line"></p>
          </div>
        );
      })}

      <h3 className="primary-text-color ml-1"> Playlists</h3>
      <div className="display-flex flex-wrap">
        {playlists?.map((playlist) => {
          return (
            <div className="playlist-details-container">
              <img
                loading="lazy"
                src={
                  playlist.videos.length
                    ? playlist.videos[playlist.videos.length - 1].video
                        .thumbnail
                    : "https://res.cloudinary.com/radheshyam11/image/upload/v1649268374/images_r83ara.png"
                }
                alt="Nature"
                className="img-responsive"
              />
              <div className="playlist-details-text">
                <h6>
                  {playlist?.name}{" "}
                  <Link to={`/playlists/${playlist._id}`}>
                    <span className="right-float text-medium">
                      View Full Playlist
                    </span>
                  </Link>
                </h6>
                <p>{playlist?.videos?.length} videos </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
