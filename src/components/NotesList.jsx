import React from "react";
import PropTypes from "prop-types";
import { NoteCard, NoteCardSkeleton } from "./NoteCard";
import { useLocale } from "../contexts/LocaleContext";

const NotesList = (props) => {
  const { notes, onDelete, onArchive } = props;
  const { locale } = useLocale();

  // IF empty
  if (notes.length === 0)
    return <h2>{locale === "en" ? "There are no notes..." : "Tidak ada catatan"}</h2>;

  return (
    <div className="notes-list">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} onDelete={onDelete} onArchive={onArchive} />
      ))}
    </div>
  );
};

const NotesListSkeleton = () => {
  const skeleton = [1, 2, 3];

  return (
    <div className="notes-list">
      {skeleton.map((card) => (
        <NoteCardSkeleton key={card} />
      ))}
    </div>
  );
};

NotesList.propType = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export { NotesList, NotesListSkeleton };
