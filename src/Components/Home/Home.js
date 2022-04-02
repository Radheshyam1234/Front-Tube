import React, { useEffect } from "react";
import { Sidebar } from "./Sidebar/Sidebar";
import { Navbar } from "./Header";
import { useVideosDataProvider } from "../../Context/VideosDataContext/VideosDataProvider";
import "./home.css";
import { VideoCard } from "./VideoCard/VideoCard";

export const Home = () => {
  useEffect(() => {
    console.log(videosList);
  }, []);
  const { videosList } = useVideosDataProvider();
  return (
    <div className="home-page-layout">
      <aside>
        <Sidebar />
      </aside>
      <section>
        <div className="chips-container">
          <button className="btn primary-btn rounded-corner-btn">All</button>
          <button className="btn secondary-btn-outline rounded-corner-btn">
            Comedy
          </button>
          <button className="btn secondary-btn-outline rounded-corner-btn">
            Games
          </button>
          <button className="btn secondary-btn-outline rounded-corner-btn">
            Movies
          </button>
          <button className="btn secondary-btn-outline rounded-corner-btn">
            Entertainment
          </button>
          <button className="btn secondary-btn-outline rounded-corner-btn">
            Cricket
          </button>
          <button className="btn secondary-btn-outline rounded-corner-btn">
            Music
          </button>
        </div>
        <div className="grid-4-column-layout">
          {videosList?.map((video) => {
            return <VideoCard video={video} />;
          })}
        </div>
      </section>
    </div>
  );
};
