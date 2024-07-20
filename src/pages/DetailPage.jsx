import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as localData from "../utils/local-data";
import { showFormattedDate } from "../utils";
import { FaTrash, FaBoxArchive, FaPenToSquare } from "react-icons/fa6";
import { RiInboxUnarchiveFill } from "react-icons/ri";
import NotFoundPage from "../pages/NotFoundPage";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(localData.getNote(id));

  function deleteHandler() {
    localData.deleteNote(id);
    navigate("/");
  }

  function archiveHandler() {
    localData.archiveNote(id);
    setNote(localData.getNote(id));
  }

  function unarchiveHandler() {
    localData.unarchiveNote(id);
    setNote(localData.getNote(id));
  }

  function editHandler() {
    navigate(`/edit/${id}`);
  }

  if (!note) {
    return <NotFoundPage />;
  }

  return (
    <div className="note-detail">
      <div className="note-detail-content">
        <h1 className="note-detail-title"> {note.title} </h1>
        <p className="note-detail-date"> {showFormattedDate(note.createdAt)} </p>
        <p className="note-detail-body"> {note.body} </p>
      </div>

      <div className="note-detail-buttons">
        <button className="button" onClick={editHandler}>
          <FaPenToSquare />
        </button>

        {!note.archived && (
          <button className="button" onClick={archiveHandler}>
            <FaBoxArchive />
          </button>
        )}

        {note.archived && (
          <button className="button" onClick={unarchiveHandler}>
            <RiInboxUnarchiveFill />
          </button>
        )}

        <button className="button danger" onClick={deleteHandler}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default DetailPage;
