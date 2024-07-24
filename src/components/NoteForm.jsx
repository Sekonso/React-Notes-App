import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import { createNote } from "../utils/notesAPI";
import { useLocale } from "../contexts/LocaleContext";

const NoteForm = () => {
  const [title, titleChangeHandler] = useInput("");
  const [body, bodyChangeHandler] = useInput("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ error: false, message: "" });
  const navigate = useNavigate();
  const { locale } = useLocale();

  async function submitHandler(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setError({ error: false, message: "" });

      const response = await createNote(title, body);

      if (response.status === "fail") throw Error(response.message);

      setLoading(false);
      navigate("/");
    } catch (error) {
      console.error(error);
      setError({ error: true, message: error.message });
      setLoading(false);
    }
  }

  return (
    <form className="note-form" onSubmit={submitHandler}>
      <div className="form-control">
        <label htmlFor="titleInput">{locale === "en" ? "Title" : "Judul"}</label>
        <input
          type="text"
          id="titleInput"
          value={title}
          placeholder={locale === "en" ? "Title" : "Judul"}
          onInput={titleChangeHandler}
          required
        />
      </div>
      <div className="form-control">
        <label htmlFor="bodyInput">{locale === "en" ? "Body" : "Isi"}</label>
        <textarea
          id="bodyInput"
          value={body}
          placeholder={locale === "en" ? "I'm thinking..." : "Aku berpikir..."}
          onInput={bodyChangeHandler}
          required
        />
      </div>
      {error.error && <div className="note-form-message danger"> {error.message} </div>}
      <button type="submit" className="button">
        {loading ? <div className="spinning-load"></div> : locale === "en" ? "Submit" : "Kirim"}
      </button>
    </form>
  );
};

export default NoteForm;
