import React from "react";
import "./Loader.css";

export const Loader = () => {
  return (
    <div className="display-flex justify-center ">
      <div className="loader-container box-shadow">
        <div className="loader"></div>
      </div>
    </div>
  );
};
