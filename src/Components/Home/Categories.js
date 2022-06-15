import React from "react";
import { Link, useLocation } from "react-router-dom";

export const Categories = ({ setSearchCategory }) => {
  const videoCategories = [
    "All",
    "CPP",
    "Javascript",
    "React Js",
    "Css",
    "web fundamentals",
  ];

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchQuery = query.get("category") ? query.get("category") : "All";
  setSearchCategory(searchQuery);

  return (
    <div className="category-container">
      {videoCategories.map((category) => {
        return (
          <Link
            to={{ search: `?category=${encodeURI(category)}` }}
            className={`btn  rounded-corner-btn ${
              searchQuery === category ? "primary-btn" : "primary-btn-outline"
            }`}
            key={category}
          >
            {category}
          </Link>
        );
      })}
    </div>
  );
};
