import axios from "axios";

export const getUserProfile = async (setUserProfile, token) => {
  if (token) {
    const user = JSON.parse(localStorage.getItem("data"));

    setUserProfile(user);
  }
};

export const getVideos = async (setVideosList) => {
  try {
    const {
      data: { videos },
    } = await axios.get("/api/videos");
    setVideosList(videos);
  } catch (error) {
    console.log(error);
  }
};

export const getLikedVideos = async (dispatch, token) => {
  if (token) {
    const likedVideos = JSON.parse(localStorage.getItem("data")).likes;
    dispatch({ type: "SET_LIKED_VIDEOS", payload: likedVideos });
  }
};
