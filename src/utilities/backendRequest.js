import axios from "axios";
import { API_URL } from "../utilities/ApiUrl";

export const getVideos = async (setVideosList) => {
  try {
    const {
      data: { response },
      status,
    } = await axios({
      method: "get",
      url: `https://front-project-database.herokuapp.com/videos`,
    });
    if (status == 200) {
      setVideosList(response);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserProfile = async (setUserProfile, token) => {
  const user = JSON.parse(localStorage.getItem("data"));
  setUserProfile(user);
};

export const getLikedVideos = async (dispatch) => {
  const likedVideos = JSON.parse(localStorage.getItem("data")).likes;
  dispatch({ type: "SET_LIKED_VIDEOS", payload: likedVideos });
};
