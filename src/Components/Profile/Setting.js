import React from "react";
import { useAuthProvider } from "../../Context/AuthContext/AuthProvider";

export const Setting = () => {
  const { logoutUser, userProfile } = useAuthProvider();
  return (
    <div>
      <button
        className="btn primary-btn-text-icon"
        onClick={() => {
          logoutUser();
        }}
      >
        <span class="btn-icon">
          <i class="fas fa-sign-out-alt"></i>
        </span>
        Log out
      </button>
    </div>
  );
};
