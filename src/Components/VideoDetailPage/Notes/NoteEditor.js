import React, { useState } from "react";
import { useAuthProvider } from "../../../Context/AuthContext/AuthProvider";
import { createNote } from "./utils";

export const NoteEditor = ({ videoId, playerRef, setNotes }) => {
  const { isUserLoggedIn } = useAuthProvider();

  const [noteDetails, setNoteDetails] = useState({
    title: "",
    description: "",
  });

  const saveNote = async () => {
    if (!isUserLoggedIn) {
      return;
    } else if (!noteDetails.title || !noteDetails.description) {
      return;
    } else {
      const time = await playerRef.current.internalPlayer.getCurrentTime();

      createNote({
        noteData: {
          video: videoId,
          title: noteDetails.title,
          description: noteDetails.description,
          time,
        },

        setNotes,
      });
    }
  };

  const discardNote = () => {
    setNoteDetails({ title: "", description: "" });
  };

  return (
    <div>
      <input
        type="text"
        className="form-field"
        placeholder="Title"
        value={noteDetails.title}
        onChange={(e) => {
          setNoteDetails({ ...noteDetails, title: e.target.value });
        }}
      />

      <textarea
        type="text"
        className="form-field"
        placeholder="Description"
        value={noteDetails.description}
        onChange={(e) => {
          setNoteDetails({ ...noteDetails, description: e.target.value });
        }}
      />

      <div className="display-flex">
        <button className="btn primary-btn" onClick={saveNote}>
          Save
        </button>
        <button className="btn primary-btn-outline" onClick={discardNote}>
          Discard
        </button>
      </div>
    </div>
  );
};
