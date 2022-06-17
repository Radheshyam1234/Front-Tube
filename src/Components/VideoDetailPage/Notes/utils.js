import axios from "axios";
import { API_URL } from "../../../utilities/ApiUrl";

export const getNotes = async ({ videoId, setNotes }) => {
  try {
    const {
      data: { response },
    } = await axios({
      url: `${API_URL}/notes/video/${videoId}`,
      method: "GET",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setNotes(response);
  } catch (error) {
    console.log(error);
  }
};

export const createNote = async ({ noteData, setToastMsg, setNotes }) => {
  try {
    const {
      data: { response },
    } = await axios({
      url: `${API_URL}/notes`,
      method: "post",
      data: noteData,

      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    console.log(response);
    setNotes((notes) => [...notes, response]);
    setToastMsg?.({
      msg: `Note added successfully`,
      msgType: "toast-success",
    });
  } catch (error) {
    console.log(error);
    setToastMsg?.({
      msg: `Something went wrong Please try again`,
      msgType: "toast-error",
    });
  }
};

export const updateNote = async ({
  note,
  updatedData,
  setNotes,
  setToastMsg,
  setEditMode,
}) => {
  try {
    const {
      data: { response },
    } = await axios({
      url: `${API_URL}/notes/${note._id}`,
      method: "post",
      data: updatedData,
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setEditMode(false);
    setToastMsg?.({
      msg: `Note Updated successfully`,
      msgType: "toast-success",
    });
    setNotes((notes) =>
      notes.map((note) => (note._id !== response._id ? note : response))
    );
  } catch (error) {
    console.log(error);
    setToastMsg?.({
      msg: `Something went wrong Please try again`,
      msgType: "toast-error",
    });
  }
};

export const deleteNote = async ({ setNotes, note, setToastMsg }) => {
  try {
    const {
      data: { response },
    } = await axios({
      url: `${API_URL}/notes/${note._id}`,
      method: "delete",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setToastMsg?.({
      msg: `Note deleted successfully`,
      msgType: "toast-success",
    });
    setNotes((notes) => notes.filter((note) => note._id !== response._id));
  } catch (error) {
    console.log(error);
    setToastMsg?.({
      msg: `Something went wrong Please try again`,
      msgType: "toast-error",
    });
  }
};

export const convertTimeToString = (time) => {
  time = Number(time);
  if (time >= 3600) {
    return `${Math.floor(time / 3600)}:${Math.floor(
      (time % 3600) / 60
    )}:${Math.floor(time % 60)}`;
  }
  return `${Math.floor(time / 60)}:${Math.floor(time % 60)}`;
};
