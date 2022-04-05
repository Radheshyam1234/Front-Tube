import React from "react";
import { Link } from "react-router-dom";
import { SearchBox } from "./SearchBox";
import { useAuthProvider } from "../../../Context/AuthContext/AuthProvider";

import "./Navbar.css";

export const Navbar = () => {
  const { isUserLoggedIn } = useAuthProvider();
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
        {isUserLoggedIn ? (
          <Link to="/myprofile">
            {" "}
            <span class="avatar xsm-avatar avatar-text">R</span>
          </Link>
        ) : (
          <Link to="/login">
            <button className="btn primary-btn-outline">Login</button>
          </Link>
        )}
      </div>
    </header>
  );
};
