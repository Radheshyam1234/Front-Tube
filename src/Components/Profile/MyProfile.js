import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthProvider } from "../../Context/AuthContext/AuthProvider";
import "./Myprofile.css";
export const MyProfile = () => {
  const { logoutUser, userProfile } = useAuthProvider();

  return (
    <div className="myProfile display-flex justify-center">
      <div className="w-30">
        <Link to="/myprofile">
          <div className="profile-page-links">Profile</div>
        </Link>

        <Link to="/myprofile/settings">
          <div className="profile-page-links">Settings</div>
        </Link>
      </div>
      <div className="Profile-details display-flex w-70">
        <h6>Profile Details</h6>
        <div className="divider-line"></div>

        <p>
          First Name
          <span className="secondary-text-color ml-1">
            {userProfile?.firstName}
          </span>
        </p>
        <p>
          Last Name
          <span className="secondary-text-color ml-1">
            {userProfile?.lastName}
          </span>
        </p>
        <p>
          Email
          <span className="secondary-text-color ml-1">
            {userProfile?.email}
          </span>
        </p>
      </div>

      {/* <button
        className="btn primary-btn"
        onClick={() => {
          logoutUser();
        }}
      >
        Logout
      </button> */}
    </div>
  );
};
