import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { showFormattedDate } from "../utils";
import { FaBoxArchive, FaTrash } from "react-icons/fa6";
import { RiInboxUnarchiveFill } from "react-icons/ri";

const NoteCard = (props) => {
  const { note, onDelete, onArchive, onUnarchive } = props;

  return (
    <div className="note-card">
      <Link to={`/${note.id}`} className="note-card-content">
        <h3 className="note-card-title">{note.title}</h3>
        <p className="note-card-date"> {showFormattedDate(note.createdAt)} </p>
        <p className="note-card-body">{note.body}</p>
      </Link>
      <div className="note-card-buttons">
        {!note.archived && (
          <button className="button" onClick={() => onArchive(note.id)}>
            <FaBoxArchive />
          </button>
        )}

        {note.archived && (
          <button className="button" onClick={() => onUnarchive(note.id)}>
            <RiInboxUnarchiveFill />
          </button>
        )}

        <button className="button danger" onClick={() => onDelete(note.id)}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

NoteCard.propTypes = {
  note: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func,
  onUnarchive: PropTypes.func,
};

export default NoteCard;
