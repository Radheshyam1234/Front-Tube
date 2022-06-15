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

export const getUserProfile = async (setUserProfile) => {
  (async () => {
    try {
      const {
        data: { response },
        status,
      } = await axios.get(`${API_URL}/users/myprofile`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (status === 200) {
        setUserProfile(response.user);
      }
    } catch (error) {
      console.log(error);
    }
  })();
};

export const getPlaylists = async (dispatch) => {
  try {
    const {
      data: {
        response: {
          historyPlaylist,
          likedPlaylist,
          watchlaterPlaylist,
          customPlaylist,
        },
      },
      status,
    } = await axios({
      method: "get",
      url: `${API_URL}/playlist`,
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (status == 200 || 201) {
      await dispatch({ type: "SET_HISTORY", payload: historyPlaylist });
      await dispatch({ type: "SET_LIKED_VIDEOS", payload: likedPlaylist });
      await dispatch({ type: "SET_WATCH_LATER", payload: watchlaterPlaylist });
      await dispatch({ type: "SET_PLAYLISTS", payload: customPlaylist });
    }
  } catch (error) {
    console.log(error);
  }
};

export const addToPlaylist = async ({
  dispatch,
  video,
  playlistId,
  type,
  setOpenDialogue,
  setToastMsg,
  setProcessingVideo,
}) => {
  setProcessingVideo?.(true);
  try {
    const {
      data: { response },
      status,
    } = await axios({
      method: "POST",
      url: `${API_URL}/playlist/${playlistId}/videos`,
      data: {
        video,
        date: new Date().toString(),
      },
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (status == 200 || 201) {
      dispatch({ type, payload: response });
      setOpenDialogue && setOpenDialogue(false);
      setToastMsg?.({
        msg: `Saved to ${response.name || response.type}`,
        msgType: "toast-success",
      });
    }
  } catch (error) {
    console.log(error);
    setToastMsg?.({
      msg: `Something went wrong Please try again`,
      msgType: "toast-error",
    });
  } finally {
    setProcessingVideo?.(false);
  }
};

export const removeFromPlaylist = async ({
  dispatch,
  video,
  playlistId,
  type,
  setOpenDialogue,
  setToastMsg,
  setProcessingVideo,
}) => {
  setProcessingVideo?.(true);
  try {
    const {
      data: { response },
      status,
    } = await axios({
      method: "DELETE",
      url: `${API_URL}/playlist/${playlistId}/videos`,
      data: {
        video,
        date: new Date().toDateString(),
      },
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (status == 200 || 201) {
      dispatch({ type, payload: response });
      // console.log(response);
      setOpenDialogue && setOpenDialogue(false);
      setToastMsg?.({
        msg: `Removed from ${response.name || response.type}`,
        msgType: "toast-success",
      });
    }
  } catch (error) {
    console.log(error);
    setToastMsg?.({
      msg: `Something went wrong Please try again`,
      msgType: "toast-error",
    });
  } finally {
    setProcessingVideo?.(false);
  }
};

export const createNewPlaylist = async ({
  dispatch,
  token,
  name,
  video,
  setToastMsg,
}) => {
  try {
    if (token) {
      const {
        data: { response },
        status,
      } = await axios({
        method: "POST",
        url: `${API_URL}/playlist`,
        data: {
          name,
          thumbnail: video.thumbnail,
          videos: [{ video, date: new Date().toString() }],
        },
        headers: {
          authorization: "Bearer " + token,
        },
      });
      if (status == 200 || 201) {
        dispatch({ type: "ADD_NEW_PLAYLIST", payload: response });
        setToastMsg({
          msg: `${response.name} created and video saved`,
          msgType: "toast-success",
        });
      }
    }
  } catch (error) {
    console.log(error);
    setToastMsg?.({
      msg: `Something went wrong Please try again`,
      msgType: "toast-error",
    });
  }
};

export const updatePlaylistInformation = async ({
  playlistId,
  dispatch,
  title,
  token,
}) => {
  if (token) {
  } else {
  }
};
