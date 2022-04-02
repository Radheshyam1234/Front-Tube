import React from "react";
import { Link } from "react-router-dom";
import { SearchBox } from "./SearchBox";

import "./Navbar.css";

export const Navbar = () => {
  return (
    <header className="header">
      <Link to="/" className="logo">
        <i class="fab fa-youtube"></i>FrontTube
      </Link>
      <div class="nav-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/" className="nav-link">
          Explore
        </Link>
      </div>
      <SearchBox />

      <div className="nav-icons">
        <Link to="/login">
          <span class="avatar xsm-avatar avatar-text">R</span>
        </Link>
      </div>
    </header>
  );
};
