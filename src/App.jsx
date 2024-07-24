import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layout
import BaseLayout from "./pages/layouts/BaseLayout";
import AuthLayout from "./pages/layouts/AuthLayout";

// Pages component
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ArchivedPage from "./pages/ArchivedPage";
import DetailPage from "./pages/DetailPage";
import AddPage from "./pages/AddPage";
import NotFoundPage from "./pages/NotFoundPage";

// Custom context hooks
import { useAuth } from "./contexts/AuthContext";

function App() {
  const [init, setInit] = useState(true);
  const { userData, fetchUserData } = useAuth();

  async function initApp() {
    await fetchUserData();
    setInit(false);
  }

  useEffect(() => {
    initApp();
  }, []);

  if (init)
    return (
      <div className="fullscreen">
        <div className="spinning-load"></div>
      </div>
    );

  if (!userData)
    return (
      <>
        <Routes>
          <Route path="/auth" element={<AuthLayout />}>
            <Route index element={<Navigate to="/auth/login" />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/auth/login" />} />
        </Routes>
      </>
    );

  return (
    <>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<HomePage />} />
          <Route path="archive" element={<ArchivedPage />} />
          <Route path="add" element={<AddPage />} />
          <Route path="notes/:id" element={<DetailPage />} />
        </Route>

        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<Navigate to="/auth/login" />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
