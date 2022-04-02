import axios from "axios";

export const getVideos = async (setVideosList) => {
  try {
    const {
      data: { videos },
    } = await axios.get("/api/videos");
    setVideosList(videos);
  } catch (error) {
    alert(error);
  }
};
