import React, { useState } from "react";
import "../video-detail-page.css";
import { convertTimeToString, deleteNote, updateNote } from "./utils";

export const NoteCard = ({ note, setNotes }) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    title: note.title,
    description: note.description,
  });

  return (
    <>
      {!editMode ? (
        <div className="note-card display-flex align-center box-shadow ">
          <div>
            <h6 className="text-semibold">{note.title}</h6>
            <p className="text-medium"> {note.description}</p>
            <p>
              <span>
                <i className="fas fa-clock"></i>
              </span>{" "}
              {convertTimeToString(note.time)}
            </p>
          </div>
          <div>
            <button
              className="btn secondary-btn-text-icon "
              onClick={() => {
                setEditMode(true);
              }}
            >
              <span className="btn-icon">
                <i className="fas fa-edit"></i>
              </span>
            </button>
            <button
              className="btn secondary-btn-text-icon btn-small "
              onClick={() => {
                deleteNote({ note, setNotes, setEditMode });
              }}
            >
              <span className="btn-icon">
                <i className="fas fa-trash"></i>
              </span>
            </button>
          </div>
        </div>
      ) : (
        <div className="note-card">
          <input
            type="text"
            className="form-field"
            placeholder="Title"
            value={updatedData.title}
            onChange={(e) => {
              setUpdatedData({ ...updatedData, title: e.target.value });
            }}
          />

          <textarea
            type="text"
            className="form-field"
            placeholder="Description"
            value={updatedData.description}
            onChange={(e) => {
              setUpdatedData({ ...updatedData, description: e.target.value });
            }}
          />

          <div className="display-flex">
            <buttton
              className="btn primary-btn"
              onClick={() => {
                updateNote({
                  note,
                  setNotes,
                  updatedData,

                  setEditMode,
                });
              }}
            >
              Update
            </buttton>
            <buttton
              className="btn secondary-btn"
              onClick={() => {
                setEditMode(false);
              }}
            >
              Discard
            </buttton>
          </div>
        </div>
      )}
    </>
  );
};
