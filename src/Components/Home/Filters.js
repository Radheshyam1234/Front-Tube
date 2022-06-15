import React from "react";

export const Filters = () => {
  return (
    <div className="category-container">
      <button className="btn primary-btn rounded-corner-btn">All</button>
      <button className="btn secondary-btn-outline rounded-corner-btn">
        C++
      </button>
      <button className="btn secondary-btn-outline rounded-corner-btn">
        Javascript
      </button>
      <button className="btn secondary-btn-outline rounded-corner-btn">
        Frontend
      </button>
      <button className="btn secondary-btn-outline rounded-corner-btn">
        Backend
      </button>
      <button className="btn secondary-btn-outline rounded-corner-btn">
        MongoDb
      </button>
    </div>
  );
};
