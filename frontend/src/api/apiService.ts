import axios from "axios";

import type NoteType from "../types/note";

const URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api/notes";

const api = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization =  token ? `Bearer ${token}` : '';
  return config;
});

export const postNote = async (newNote: NoteType) => {
  const response = await api.post(
    URL,
    {
      title: newNote.title,
      content: newNote.content,
    }
  );
  return response;
};

export const patchNote = async (updatedNote: NoteType) => {
  const response = await api.put(
    `${URL}/${updatedNote.id}`,
    {
      title: updatedNote.title,
      content: updatedNote.content,
    }
  );
  return response;
};

export const removeNote = async (id: number) => {
  const response = await api.delete(`${URL}/${id}`);
  return response;
};

export const getNotes = async () => {
  const response = await api.get(URL);
  return response;
};

export const login = async (username: string, password: string) => {
  const response = await axios.post(
    "http://localhost:5000/api/login",
    {
      username,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response);
  return response;
};
