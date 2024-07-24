import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import * as localData from "../utils/local-data";
import { NotesList, NotesListSkeleton } from "../components/NotesList";
import SearchField from "../components/SearchField";
import { getArchivedNotes } from "../utils/notesAPI";

const ArchivedPage = () => {
  const [searchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ error: false, message: "" });
  const [popupDisplay, setPopupDisplay] = useState({ status: "disable", message: "" });

  async function fetchArchivedNotes() {
    try {
      setLoading(true);
      setError({ error: false, message: "" });

      const response = await getArchivedNotes();

      if (response.status === "fail") throw new Error(response.message);

      setNotes(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError({ error: true, message: error.message });
      setLoading(false);
    }
  }

  function filterNotes() {
    if (!searchParams.get("title")) {
      setFilteredNotes(notes);
      return;
    }

    const filteredNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(searchParams.get("title").toLowerCase())
    );

    setFilteredNotes(filteredNotes);
  }

  useEffect(() => {
    fetchArchivedNotes();

    addEventListener("refresh-notes", fetchArchivedNotes);

    return () => {
      removeEventListener("refresh-notes", fetchArchivedNotes);
    };
  }, []);

  useEffect(() => {
    filterNotes();
  }, [notes, searchParams]);

  // RENDER
  if (error.error) return <h2>{error.message}</h2>;

  return (
    <>
      <SearchField />

      {loading ? <NotesListSkeleton /> : <NotesList notes={filteredNotes} />}
    </>
  );
};

export default ArchivedPage;
