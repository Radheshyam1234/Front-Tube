import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../../Context/StateContext/StateProvider";
import "./sidebar.css";

export const Sidebar = () => {
  const {
    state: { playlists },
  } = useStateContext();

  const [showPlaylists, setShowPlaylists] = useState(false);

  return (
    <div className="sidebar">
      <div className="sidebar-child text-semibold">
        <span>
          <i className="fas fa-home text-large"></i>Home
        </span>
      </div>
      <div className="sidebar-child text-semibold">
        <span>
          <i className="far fa-compass text-large"></i>Explore
        </span>
      </div>

      <div className="divider-line"></div>

      <div className="sidebar-child text-semibold">
        <Link to="/library">
          <span>
            <i className="fas fa-play text-large"></i>Library
          </span>
        </Link>
      </div>

      <div className="sidebar-child text-semibold">
        <Link to="/history">
          <span>
            <i className="fas fa-history text-large"></i>History
          </span>
        </Link>
      </div>

      <div className="sidebar-child text-semibold">
        <Link to="/watchlater">
          <span>
            <i className="far fa-clock text-large"></i>Watch later
          </span>
        </Link>
      </div>

      <div className="sidebar-child text-semibold">
        <Link to="/liked">
          <span>
            <i className="far fa-thumbs-up text-large"></i>Liked videos
          </span>
        </Link>
      </div>

      <div className="sidebar-child text-semibold">
        <Link to="/stats">
          <span>
            <i className="fas fa-chart-bar"></i> Activity/Stats
          </span>
        </Link>
      </div>

      {!showPlaylists && (
        <div className="sidebar-child text-semibold">
          <span
            onClick={() => {
              setShowPlaylists(true);
            }}
          >
            <i className="	fas fa-chevron-circle-down up-down-icon"></i>Show more
          </span>
        </div>
      )}

      {showPlaylists &&
        playlists.map((playlist) => {
          return (
            <div className="sidebar-child text-semibold">
              <Link to={`/playlists/${playlist._id}`}>
                <span>
                  {" "}
                  <i className="fas fa-caret-square-right"></i>
                  {playlist.name}
                </span>
              </Link>
            </div>
          );
        })}
      {showPlaylists && (
        <div className="sidebar-child text-semibold">
          <span
            onClick={() => {
              setShowPlaylists(false);
            }}
          >
            <i className="	fas fa-chevron-circle-up up-down-icon"></i>Show less
          </span>
        </div>
      )}
    </div>
  );
};
