import React, { useEffect, useState } from "react";
import { getNotes } from "./utils";
import { NoteEditor } from "./NoteEditor";

import { useAuthProvider } from "../../../Context/AuthContext/AuthProvider";
import { NoteCard } from "./NoteCard";

export const NotesContainer = ({ videoId, playerRef }) => {
  const { isUserLoggedIn } = useAuthProvider();

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (isUserLoggedIn) {
      getNotes({ videoId, setNotes });
    }
  }, []);

  return (
    <>
      <h5>Notes</h5>
      <div className="note-editor-container">
        <NoteEditor
          videoId={videoId}
          playerRef={playerRef}
          setNotes={setNotes}
        />
      </div>
      {notes.length ? (
        <div className="note-cards-container">
          {notes.map((note) => {
            return <NoteCard note={note} setNotes={setNotes} key={note._id} />;
          })}
        </div>
      ) : (
        "No Notes"
      )}
    </>
  );
};
