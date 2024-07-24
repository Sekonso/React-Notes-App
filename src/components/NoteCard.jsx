import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { showFormattedDate } from "../utils";
import { FaBoxArchive, FaTrash } from "react-icons/fa6";
import { RiInboxUnarchiveFill } from "react-icons/ri";
import { archiveNote, unarchiveNote, deleteNote } from "../utils/notesAPI";

const NoteCard = (props) => {
  const { note } = props;
  const [archiveLoading, setArchiveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  async function archiveHandler() {
    try {
      setArchiveLoading(true);

      const response = await archiveNote(note.id);

      if (response.status === "fail") throw new Error(response.message);

      setArchiveLoading(false);
      dispatchEvent(new Event("refresh-notes"));
    } catch (error) {
      console.error(error);
      window.alert(error.message);
    }
  }

  async function unarchiveHandler() {
    try {
      setArchiveLoading(true);

      const response = await unarchiveNote(note.id);

      if (response.status === "fail") throw new Error(response.message);

      setArchiveLoading(false);
      dispatchEvent(new Event("refresh-notes"));
    } catch (error) {
      console.error(error);
      setArchiveLoading(false);
      window.alert(error.message);
    }
  }

  async function deleteHandler() {
    try {
      setDeleteLoading(true);

      const response = await deleteNote(note.id);

      if (response.status === "fail") throw new Error(response.message);

      setDeleteLoading(false);
      dispatchEvent(new Event("refresh-notes"));
    } catch (error) {
      console.error(error);
      setDeleteLoading(false);
      window.alert(error.message);
    }
  }

  return (
    <div className="note-card">
      <Link to={`/notes/${note.id}`} className="note-card-content">
        <h3 className="note-card-title">{note.title}</h3>
        <p className="note-card-date"> {showFormattedDate(note.createdAt)} </p>
        <p className="note-card-body">{note.body}</p>
      </Link>

      <div className="note-card-buttons">
        {/* Archive/unarchive */}
        {!note.archived ? (
          <button className="button" onClick={archiveHandler}>
            {archiveLoading ? <div className="spinning-load"></div> : <FaBoxArchive />}
          </button>
        ) : (
          <button className="button" onClick={unarchiveHandler}>
            {archiveLoading ? <div className="spinning-load"></div> : <RiInboxUnarchiveFill />}
          </button>
        )}

        {/* Delete */}
        <button className="button danger" onClick={deleteHandler}>
          {deleteLoading ? <div className="spinning-load"></div> : <FaTrash />}
        </button>
      </div>
    </div>
  );
};

const NoteCardSkeleton = () => {
  return (
    <div className="note-card-skeleton">
      <div className="note-card-skeleton-content skeleton-load"></div>
      <div className="note-card-skeleton-buttons ">
        <div className="skeleton-load"></div>
        <div className="skeleton-load"></div>
      </div>
    </div>
  );
};

NoteCard.propTypes = {
  note: PropTypes.object.isRequired,
};

export { NoteCard, NoteCardSkeleton };
