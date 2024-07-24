import React, { createContext, useState, useEffect, useContext, useMemo } from "react";

const ThemeContext = createContext();

const useTheme = () => {
  return useContext(ThemeContext);
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => getLocalTheme());

  function toggleTheme() {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  }

  function storeLocalTheme(theme) {
    localStorage.setItem("theme", theme);
  }

  function getLocalTheme() {
    return localStorage.getItem("theme") || "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }

  useEffect(() => {
    storeLocalTheme(theme);
    applyTheme(theme);
  }, [theme]);

  const contextValue = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

export { ThemeProvider, useTheme };
