import { getAccessToken } from "./authAPI";

const baseURL = "https://notes-api.dicoding.dev/v1";

const fetchNote = async (path, options = {}) => {
  const response = await fetch(`${baseURL}/${path}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

  return response.json();
};

const createNote = async (title, body) => {
  return await fetchNote("notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, body }),
  });
};

const getActiveNotes = async () => {
  return await fetchNote("notes");
};

const getArchivedNotes = async () => {
  return await fetchNote("notes/archived");
};

const getNote = async (id) => {
  return await fetchNote(`notes/${id}`);
};

const archiveNote = async (id) => {
  return await fetchNote(`notes/${id}/archive`, { method: "POST" });
};

const unarchiveNote = async (id) => {
  return await fetchNote(`notes/${id}/unarchive`, { method: "POST" });
};

const deleteNote = async (id) => {
  return await fetchNote(`notes/${id}`, { method: "DELETE" });
};

export {
  createNote,
  getActiveNotes,
  getArchivedNotes,
  getNote,
  archiveNote,
  unarchiveNote,
  deleteNote,
};
