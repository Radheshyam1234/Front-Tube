import { useStateContext } from "../../Context/StateContext/StateProvider";
import axios from "axios";

export const useUserActions = () => {
  const { state, dispatch } = useStateContext();

  const isPresentInLikedVideos = (video) =>
    state?.likedVideos?.find((item) => item._id == video._id);

  const addToLikedVideos = async (video) => {
    try {
      const {
        data: { likes },
        status,
      } = await axios({
        method: "POST",
        url: `/api/user/likes`,
        headers: {
          authorization: localStorage.getItem("token"),
        },
        data: {
          video,
        },
      });

      if (status == 200 || 201) {
        let data = JSON.parse(localStorage.getItem("data"));
        data = { ...data, likes: [...data.likes, video] };
        localStorage.setItem("data", JSON.stringify(data));
        dispatch({ type: "SET_LIKED_VIDEOS", payload: data.likes });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromLikedVideos = async (video) => {
    try {
      const videoId = video._id;
      const {
        data: { likes },
        status,
      } = await axios({
        method: "DELETE",
        url: `/api/user/likes/${video._id}`,
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });

      if (status == 200 || 201) {
        let data = JSON.parse(localStorage.getItem("data"));
        const likedVideos = data.likes.filter((vdo) => video._id !== vdo._id);
        data = { ...data, likes: likedVideos };
        localStorage.setItem("data", JSON.stringify(data));
        dispatch({ type: "SET_LIKED_VIDEOS", payload: data.likes });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return {
    isPresentInLikedVideos,
    addToLikedVideos,
    removeFromLikedVideos,
  };
};
