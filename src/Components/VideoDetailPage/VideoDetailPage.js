import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import axios from "axios";

import { VideoDetailsSection } from "./VideoDetailsSection";
import { useUserActions } from "../utils/useUserActions";

import "./video-detail-page.css";

export const VideoDetailPage = () => {
  const [videoDetails, setVideoDetails] = useState(null);
  const { addToHistory } = useUserActions();
  const token = localStorage.getItem("token");

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
              url={`https://www.youtube.com/watch?v=${id}`}
              width={"100%"}
              height={"100%"}
              onStart={() => {
                if (token) {
                  addToHistory(videoDetails);
                }
              }}
            />
          </div>
          <VideoDetailsSection video={videoDetails} />
        </>
      )}
    </div>
  );
};
