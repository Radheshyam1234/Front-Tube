import React, { useEffect } from "react";
import { Sidebar } from "./Sidebar/Sidebar";
import { Filters } from "./Filters";
import { useVideosDataProvider } from "../../Context/VideosDataContext/VideosDataProvider";
import "./home.css";
import { VideoCard } from "./VideoCard/VideoCard";

export const Home = () => {
  const { videosList } = useVideosDataProvider();
  return (
    <div className="home-page-layout">
      <aside>
        <Sidebar />
      </aside>

      <section>
        <Filters />
        <div className="grid-4-column-layout">
          {videosList?.map((video) => {
            return <VideoCard video={video} />;
          })}
        </div>
      </section>
    </div>
  );
};
