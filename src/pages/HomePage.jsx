import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import * as localData from "../utils/local-data";
import NoteCard from "../components/NoteCard";
import SearchField from "../components/SearchField";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.get("title")) setNotes(localData.getActiveNotes());
    else setNotes(localData.searchNotes(searchParams.get("title").toLowerCase()));
  }, [searchParams]);

  function searchInputHandler(event) {
    setSearchParams({ title: event.target.value });
  }

  function deleteHandler(id) {
    localData.deleteNote(id);
    setNotes(localData.getActiveNotes);
  }

  function archiveHandler(id) {
    localData.archiveNote(id);
    setNotes(localData.getActiveNotes);
  }

  return (
    <>
      <SearchField title={searchParams.get("title")} onInput={searchInputHandler} />

      {notes.length === 0 ? (
        <h2>There are no notes...</h2>
      ) : (
        <div className="notes-list">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onDelete={deleteHandler}
              onArchive={archiveHandler}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default HomePage;
