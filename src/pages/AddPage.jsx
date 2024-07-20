import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as localData from "../utils/local-data";
import NoteForm from "../components/NoteForm";

const AddPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  function submitHandler(event) {
    event.preventDefault();

    localData.addNote({ title, body });
    navigate("/");
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
