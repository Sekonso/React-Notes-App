import React from "react";
import PropTypes from "prop-types";

const NoteForm = (props) => {
  const { title, body, onInputTitle, onInputBody, onSubmit } = props;

  return (
    <form className="note-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label htmlFor="titleInput">Title</label>
        <input
          type="text"
          id="titleInput"
          value={title}
          placeholder="Title"
          onInput={onInputTitle}
          required
        />
        <span className="input-limit">{`${title.length}/50`}</span>
      </div>
      <div className="form-control">
        <label htmlFor="bodyInput">Body</label>
        <textarea id="bodyInput" value={body} placeholder="Body" onInput={onInputBody} required />
        <span className="input-limit">{`${body.length}/250`}</span>
      </div>
      <button type="submit" className="button">
        Submit
      </button>
    </form>
  );
};

NoteForm.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  onInputTitle: PropTypes.func.isRequired,
  onInputBody: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default NoteForm;
