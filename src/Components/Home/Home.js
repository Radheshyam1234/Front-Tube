import React, { useState } from "react";
import { Sidebar } from "./Sidebar/Sidebar";

import { Categories } from "./Categories";

import { useVideosDataProvider } from "../../Context/VideosDataContext/VideosDataProvider";
import "./home.css";
import { VideoCard } from "./VideoCard/VideoCard";
import { Loader } from "../Loader/Loader";

export const Home = () => {
  const { videosList } = useVideosDataProvider();
  const [searchCategory, setSearchCategory] = useState("All");
  return (
    <div className="home-page-layout">
      <aside>
        <Sidebar />
      </aside>

      <section>
        <Categories setSearchCategory={setSearchCategory} />

        <div className="grid-4-column-layout">
          {videosList.length ? (
            <>
              {searchCategory === "All"
                ? videosList?.map((video) => {
                    return <VideoCard video={video} key={video._id} />;
                  })
                : videosList
                    .filter((video) => video.category === searchCategory)
                    .map((video) => (
                      <VideoCard video={video} key={video._id} />
                    ))}
            </>
          ) : (
            <Loader />
          )}
        </div>
      </section>
    </div>
  );
};
