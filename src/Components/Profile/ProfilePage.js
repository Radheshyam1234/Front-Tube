import React, { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";

export const ProfilePage = () => {
  return (
    <div className="myProfile display-flex justify-center">
      <div className="w-30">
        <NavLink to="/myprofile">
          <div className="profile-page-links">Profile</div>
        </NavLink>

        <NavLink
          to="/myprofile/settings"
          className={({ isActive }) =>
            isActive ? "text-primary text-semibold" : ""
          }
        >
          <div className="profile-page-links">Settings</div>
        </NavLink>
      </div>
      <div className="Profile-details display-flex w-70">
        <Outlet />
      </div>
    </div>
  );
};
