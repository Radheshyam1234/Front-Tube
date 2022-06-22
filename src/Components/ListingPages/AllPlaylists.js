import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "./../../Context/StateContext/StateProvider";

export const AllPlaylists = () => {
  const { state } = useStateContext();
  const [defaultPlaylists, setDefaultPlaylists] = useState();
  const [customPlaylists, setCustomPlaylists] = useState();

  useEffect(() => {
    let playlists = [state.likedVideos, state.watchHistory, state.watchLater];
    setDefaultPlaylists(playlists);
    setCustomPlaylists(state.playlists);
  }, [state]);
  return (
    <div className="playlists-container display-flex flex-wrap justify-center">
      {defaultPlaylists?.map((playlist) => {
        return (
          <Link to={`/${playlist.type}`}>
            <div className="playlist-box box-shadow ">
              <span>{playlist.type}</span>
              <div></div>
            </div>
          </Link>
        );
      })}

      {customPlaylists?.map((playlist) => {
        return (
          <Link to={playlist._id} key={playlist._id}>
            <div className="playlist-box box-shadow">
              <span>{playlist.name}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
