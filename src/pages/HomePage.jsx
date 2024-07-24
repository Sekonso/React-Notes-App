import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import * as localData from "../utils/local-data";
import { NotesList, NotesListSkeleton } from "../components/NotesList";
import SearchField from "../components/SearchField";
import { getActiveNotes } from "../utils/notesAPI";

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ error: false, message: "" });

  async function fetchActiveNotes() {
    try {
      setLoading(true);
      setError({ error: false, message: "" });

      const response = await getActiveNotes();

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
    fetchActiveNotes();

    addEventListener("refresh-notes", fetchActiveNotes);

    return () => {
      removeEventListener("refresh-notes", fetchActiveNotes);
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

export default HomePage;
