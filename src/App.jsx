import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

// Pages component
import HomePage from "./pages/HomePage";
import ArchivedPage from "./pages/ArchivedPage";
import DetailPage from "./pages/DetailPage";
import AddPage from "./pages/AddPage";
import NotFoundPage from "./pages/NotFoundPage";
import EditPage from "./pages/EditPage";

function App() {
  return (
    <>
      <header className="navbar">
        <h1>
          <Link to="/">Quick Notes</Link>
        </h1>
        <div className="nav-links">
          <Link to="/archive" className="button">
            Archived
          </Link>
          <Link to="/add" className="button">
            <FaPlus />
          </Link>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/archive" element={<ArchivedPage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/:id" element={<DetailPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
