import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaMoon, FaSun, FaRightFromBracket } from "react-icons/fa6";
import { useTheme } from "../contexts/ThemeContext";
import { useLocale } from "../contexts/LocaleContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { locale, toggleLocale } = useLocale();
  const navigate = useNavigate();

  function logoutHandler() {
    localStorage.removeItem("access-token");
    navigate("/auth/login");
  }

  return (
    <div className="navbar">
      <h1>
        <Link to="/">{locale === "en" ? "Quick Notes" : "Catat Kilat"}</Link>
      </h1>

      <div className="nav-links">
        <Link to="/archive" className="button">
          {locale === "en" ? "Archive" : "Arsip"}
        </Link>

        <Link to="/add" className="button">
          <FaPlus />
        </Link>

        <button className="button" onClick={toggleTheme}>
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>

        <button className="button" onClick={toggleLocale}>
          {locale === "en" ? "en" : "id"}
        </button>

        <button className="button" onClick={logoutHandler}>
          <FaRightFromBracket />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
