import React from "react";
import { useLocale } from "../contexts/LocaleContext";

const NotFoundPage = () => {
  const { locale } = useLocale();

  return (
    <div className="fullscreen">
      <h1>404</h1>
      <h1>{locale === "en" ? "PAGE NOT FOUND" : "HALAMAN TIDAK DITEMUKAN"}</h1>
    </div>
  );
};

export default NotFoundPage;
