import React from "react";
import PropTypes from "prop-types";
import { FaSearch } from "react-icons/fa";

const SearchField = (props) => {
  const { title, onInput } = props;

  return (
    <div className="search-field">
      <label htmlFor="search-input">
        <FaSearch />
      </label>
      <input
        type="search"
        id="search-input"
        value={title}
        placeholder="Search note..."
        onInput={onInput}
      ></input>
    </div>
  );
};

SearchField.propTypes = {
  title: PropTypes.string,
  onInput: PropTypes.func.isRequired,
};

export default SearchField;
