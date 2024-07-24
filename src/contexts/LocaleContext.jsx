import React, { createContext, useState, useEffect, useContext, useMemo } from "react";

const LocaleContext = createContext();

const useLocale = () => {
  return useContext(LocaleContext);
};

const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = useState(() => getLocalLocale());

  function toggleLocale() {
    locale === "en" ? setLocale("id") : setLocale("en");
  }

  function storeLocalLocale(locale) {
    localStorage.setItem("locale", locale);
  }

  function getLocalLocale() {
    return localStorage.getItem("locale") || "en";
  }

  useEffect(() => {
    storeLocalLocale(locale);
  }, [locale]);

  const contextValue = useMemo(() => ({ locale, toggleLocale }), [locale]);

  return <LocaleContext.Provider value={contextValue}>{children}</LocaleContext.Provider>;
};

export { LocaleProvider, useLocale };
