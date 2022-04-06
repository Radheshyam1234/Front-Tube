import axios from "axios";

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

export const getLikedVideos = async (state, dispatch) => {
  try {
    const {
      data: { likes },
      status,
    } = await axios({
      method: "GET",
      url: `/api/user/likes`,
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });

    if (status == 200 || 201) {
      // console.log(likes);
      dispatch({ type: "SET_LIKED_VIDEOS", payload: likes });
    }
  } catch (error) {
    console.log(error);
  }
};
