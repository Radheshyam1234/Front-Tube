import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useVideosDataProvider } from "../../Context/VideosDataContext/VideosDataProvider";
import { VideoCard } from "../Home/VideoCard/VideoCard";

export const SearchResultPage = () => {
  const { query: searchedItem } = useParams();

  const { videosList } = useVideosDataProvider();

  const FilteredData = () => {
    return videosList.filter(({ category, description, title }) => {
      return (
        category.toLowerCase().includes(searchedItem.toLowerCase()) ||
        description.toLowerCase().includes(searchedItem.toLowerCase()) ||
        title.toLowerCase().includes(searchedItem.toLowerCase()) ||
        searchedItem.toLowerCase().includes(category.toLowerCase()) ||
        searchedItem.toLowerCase().includes(description.toLowerCase()) ||
        searchedItem.toLowerCase().includes(title.toLowerCase())
      );
    });
  };

  useEffect(() => {
    console.log(searchedItem);
    console.log(FilteredData());
  }, []);

  return (
    <div>
      {FilteredData().length ? (
        <div>
          <h4 className="text-center">
            {FilteredData().length} items found for your search{" "}
            <span className=" primary-text-color">"{searchedItem}"</span>
          </h4>
          <div className="spacer-3rem"></div>
          <div className="grid-4-column-layout">
            {FilteredData().length &&
              FilteredData().map((video) => {
                return <VideoCard video={video} key={video._id} />;
              })}
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-center secondary-text-color">
            No results found for your search
          </h3>
        </div>
      )}
    </div>
  );
};
