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
        dispatch({ type: "SET_LIKED_VIDEOS", payload: likes });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromLikedVideos = async (videoId) => {
    try {
      const {
        data: { likes },
        status,
      } = await axios({
        method: "DELETE",
        url: `/api/user/likes/${videoId}`,
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });

      if (status == 200 || 201) {
        dispatch({ type: "SET_LIKED_VIDEOS", payload: likes });
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
