import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import axios from "axios";

import { VideoDetailsSection } from "./VideoDetailsSection";
import { NotesContainer } from "./Notes/NotesContainer";
import { addToPlaylist } from "../../utilities/backendRequest";
import { useStateContext } from "../../Context/StateContext/StateProvider";
import { isPresentInWatchHistory } from "../../utilities/array-manipulation";

import "./video-detail-page.css";
import { API_URL } from "../../utilities/ApiUrl";

export const VideoDetailPage = () => {
  const [videoDetails, setVideoDetails] = useState(null);
  const token = localStorage.getItem("token");
  const { state, dispatch } = useStateContext();
  const playerRef = useRef(null);

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { response },
          status,
        } = await axios({
          method: "GET",
          url: `${API_URL}/videos/${id}`,
        });
        if (status == 200) {
          setVideoDetails(response);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const opts = {
    height: "250",
    width: "100%",
    playerVars: {
      autoplay: 1,
      rel: 0,
    },
  };

  return (
    <div className="video-details-page">
      {videoDetails ? (
        <div className="video-details-page-child">
          <div className="display-flex flex-column video-parent-container">
            <div className="video-container">
              <YouTube
                ref={playerRef}
                videoId={videoDetails.videoId}
                opts={opts}
                onPlay={() => {
                  if (
                    token &&
                    !isPresentInWatchHistory(state, videoDetails._id)
                  ) {
                    addToPlaylist({
                      dispatch,
                      video: videoDetails,
                      playlistId: state.watchHistory._id,
                      type: "SET_HISTORY",
                    });
                  }
                }}
              />
            </div>
            <div>
              <VideoDetailsSection video={videoDetails} />
            </div>
          </div>
          <div className="notes-section" id="note-section">
            <NotesContainer videoId={videoDetails._id} playerRef={playerRef} />
          </div>
        </div>
      ) : (
        <div className="display-flex justify-center ">
          <div className="loader-container box-shadow">
            <div className="loader"></div>
          </div>
        </div>
      )}
    </div>
  );
};
