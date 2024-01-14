import axios from 'axios';

import type NoteType from "../types/note";

const URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api/notes";


export const postNote = async (newNote: NoteType) => {
  const response = await axios.post(
    URL,
    {
      title: newNote.title,
      content: newNote.content,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};


export const patchNote = async (updatedNote: NoteType) => {
    const response = await axios.put(
        `${URL}/${updatedNote.id}`,
        {
        title: updatedNote.title,
        content: updatedNote.content,
        },
        {
        headers: {
            "Content-Type": "application/json",
        },
        }
    );
    return response;
    };

export const removeNote = async (id: number) => {
    const response = await axios.delete(`${URL}/${id}`);
    return response;
}

export const getNotes = async () => {
    const response = await axios.get(URL);
    return response;
}
