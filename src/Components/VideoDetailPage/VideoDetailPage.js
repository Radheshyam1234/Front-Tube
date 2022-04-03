import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import axios from "axios";

import { VideoDetailsSection } from "./VideoDetailsSection";
import "./video-detail-page.css";

export const VideoDetailPage = () => {
  const [videoDetails, setVideoDetails] = useState(null);
  //const playerRef = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { video },
        } = await axios.get(`/api/video/${id}`);
        setVideoDetails(video);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div className="video-details-page">
      {videoDetails && (
        <>
          <div className="video-container">
            <ReactPlayer
              // ref={playerRef}
              url={`https://www.youtube.com/watch?v=${id}`}
              width={"100%"}
              height={"100%"}
            />
          </div>
          <VideoDetailsSection video={videoDetails} />
        </>
      )}
    </div>
  );
};
