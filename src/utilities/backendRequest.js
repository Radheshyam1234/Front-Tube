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
