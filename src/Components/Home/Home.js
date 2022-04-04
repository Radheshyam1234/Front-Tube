import React, { useEffect } from "react";
import { Sidebar } from "./Sidebar/Sidebar";
import { Categories } from "./Categories";
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
        <Categories />
        <div className="grid-4-column-layout">
          {videosList?.map((video) => {
            return <VideoCard video={video} />;
          })}
        </div>
      </section>
    </div>
  );
};
