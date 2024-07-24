import React from "react";
import { ThemeProvider } from "./ThemeContext";
import { AuthProvider } from "./AuthContext";
import { LocaleProvider } from "../contexts/LocaleContext";

const GlobalContextProvider = ({ children }) => {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <AuthProvider>{children}</AuthProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
};

export default GlobalContextProvider;
