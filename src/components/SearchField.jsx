import React from "react";
import { FaSearch } from "react-icons/fa";
import useSearchFilter from "../hooks/useSearchFilter";
import { useLocale } from "../contexts/LocaleContext";

const SearchField = () => {
  const [title, titleChangeHandler] = useSearchFilter();
  const { locale } = useLocale();

  return (
    <div className="search-field">
      <label htmlFor="search-input">
        <FaSearch />
      </label>
      <input
        type="search"
        id="search-input"
        value={title}
        placeholder={locale === "en" ? "Search note..." : "Cari catatan..."}
        onInput={titleChangeHandler}
      ></input>
    </div>
  );
};

export default SearchField;
