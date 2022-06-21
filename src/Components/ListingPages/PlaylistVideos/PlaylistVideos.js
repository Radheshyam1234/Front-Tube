import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { HorizontalVideoCard } from "../HorizontalVideoCard";
import { useStateContext } from "../../../Context/StateContext/StateProvider";
import { useAuthProvider } from "../../../Context/AuthContext/AuthProvider";

import { updatePlaylistInformation } from "../../../utilities/backendRequest";

export const PlaylistVideos = () => {
  const { playlistId } = useParams();
  const [editMode, setEditMode] = useState(false);
  const {
    state: { playlists },
    dispatch,
  } = useStateContext();

  const { token } = useAuthProvider();
  const navigate = useNavigate();

  const playlist = playlists?.find((playlist) => playlist._id == playlistId);

  const [title, setTitle] = useState(playlist?.name);

  return (
    <>
      {playlist?.videos?.length ? (
        <div className="Videos-container">
          <div className="grid-30-70-layout">
            <div className="playlist-details-container">
              <img
                loading="lazy"
                src={
                  playlist?.videos[playlist.videos.length - 1].video.thumbnail
                }
                alt="Nature"
                className="img-responsive"
              />
              <div className="playlist-details-text">
                {editMode ? (
                  <>
                    <input
                      type="text"
                      className="form-field text-large text-semibold"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                    <div className="display-flex">
                      <button
                        className="btn primary-btn"
                        onClick={() => {
                          updatePlaylistInformation({
                            playlistId,
                            dispatch,
                            title,
                            token,
                          });
                          setEditMode(false);
                        }}
                      >
                        Save
                      </button>
                      <button
                        className="btn primary-btn-outline"
                        onClick={() => {
                          setEditMode(false);
                        }}
                      >
                        Discard
                      </button>
                    </div>
                  </>
                ) : (
                  <h4>{playlist?.name}</h4>
                )}

                <p>{playlist?.videos.length} videos </p>
              </div>

              <div className="display-flex">
                <button
                  className="btn secondary-btn"
                  title=" Edit Title"
                  onClick={() => {
                    if (!token) navigate("/login");
                    else setEditMode(true);
                  }}
                >
                  <i className="fas fa-pen"> Edit</i>{" "}
                </button>
                <button
                  className="btn primary-btn-outline"
                  title="Delete Playlist"
                >
                  {" "}
                  <i className="fas fa-trash-alt ml-1"> Delete</i>
                </button>
              </div>
            </div>
            <div>
              {playlist?.videos
                .slice()
                .reverse()
                .map((videoItem) => {
                  return (
                    <HorizontalVideoCard
                      videoItem={videoItem}
                      type="UPDATE_PLAYLIST"
                      playlistId={playlist._id}
                      key={videoItem._id}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      ) : (
        <div className="playlist-details-container w-30">
          <img
            loading="lazy"
            src={
              "https://res.cloudinary.com/radheshyam11/image/upload/v1649268374/images_r83ara.png"
            }
            alt="Nature"
            className="img-responsive"
          />
          <div className="playlist-details-text">
            <h4>{playlist?.name}</h4>
            <p>No videos </p>
          </div>
        </div>
      )}
    </>
  );
};
