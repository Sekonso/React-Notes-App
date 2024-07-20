import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as localData from "../utils/local-data";
import NoteForm from "../components/NoteForm";

const AddPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const note = localData.getNote(id);
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);

  function submitHandler(event) {
    event.preventDefault();

    localData.editNote({ id, title, body });
    navigate(`/${id}`);
  }

  function titleInputHandler(event) {
    if (event.target.value.length > 50) {
      setTitle(title);
      return;
    }

    setTitle(event.target.value);
  }

  function bodyInputHandler(event) {
    if (event.target.value.length > 250) {
      setBody(body);
      return;
    }

    setBody(event.target.value);
  }

  return (
    <NoteForm
      title={title}
      body={body}
      onInputTitle={titleInputHandler}
      onInputBody={bodyInputHandler}
      onSubmit={submitHandler}
    />
  );
};

export default AddPage;
