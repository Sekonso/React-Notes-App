import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as localData from "../utils/local-data";
import { showFormattedDate } from "../utils";
import { FaTrash, FaBoxArchive } from "react-icons/fa6";
import { RiInboxUnarchiveFill } from "react-icons/ri";
import { getNote, archiveNote, unarchiveNote, deleteNote } from "../utils/notesAPI";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(localData.getNote(id));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ error: false, message: "" });
  const [archiveLoading, setArchiveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  async function fetchNote() {
    try {
      setLoading(true);
      setError({ error: false, message: "" });

      const response = await getNote(id);

      if (response.status === "fail") throw new Error(response.message);

      setNote(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError({ error: true, message: error.message });
      setLoading(false);
    }
  }

  async function archiveHandler() {
    try {
      setArchiveLoading(true);

      const response = await archiveNote(id);

      if (response.status === "fail") throw new Error(response.message);

      setArchiveLoading(false);
      fetchNote();
    } catch (error) {
      console.error(error);
      setArchiveLoading(false);
      window.alert(error.message);
    }
  }

  async function unarchiveHandler() {
    try {
      setArchiveLoading(true);

      const response = await unarchiveNote(id);

      if (response.status === "fail") throw new Error(response.message);

      setArchiveLoading(false);
      fetchNote();
    } catch (error) {
      console.error(error);
      setArchiveLoading(false);
      window.alert(error.message);
    }
  }

  async function deleteHandler() {
    try {
      setDeleteLoading(true);

      const response = await deleteNote(id);

      if (response.status === "fail") throw new Error(response.message);

      setDeleteLoading(false);
      navigate("/");
    } catch (error) {
      console.error(error);
      setDeleteLoading(false);
      window.alert(error.message);
    }
  }

  useEffect(() => {
    fetchNote();
  }, []);

  // RENDER
  if (loading) return <Skeleton />;

  if (error.error === true) return <div>{error.message}</div>;

  return (
    <div className="note-detail">
      <div className="note-detail-content">
        <h1 className="note-detail-title"> {note.title} </h1>
        <p className="note-detail-date"> {showFormattedDate(note.createdAt)} </p>
        <p className="note-detail-body"> {note.body} </p>
      </div>

      <div className="note-detail-buttons">
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

const Skeleton = () => {
  return (
    <div className="note-detail">
      <div className="note-detail-skeleton-upper skeleton-load"></div>
      <div className="note-detail-skeleton-lower skeleton-load"></div>
    </div>
  );
};

export default DetailPage;
