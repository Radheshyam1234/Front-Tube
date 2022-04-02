import React from "react";
import "./sidebar.css";

export const Sidebar = () => {
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
        <span>
          <i className="fas fa-history text-large"></i>History
        </span>
      </div>

      <div className="sidebar-child text-semibold">
        <span>
          <i className="far fa-thumbs-up text-large"></i>Liked videos
        </span>
      </div>

      <div className="sidebar-child text-semibold">
        <span>
          <i className="far fa-clock text-large"></i>Watch later
        </span>
      </div>

      <div className="sidebar-child text-semibold">
        <span>
          <i className="fas fa-play text-large"></i>Library
        </span>
      </div>
    </div>
  );
};
