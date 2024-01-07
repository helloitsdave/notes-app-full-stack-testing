import React, { useEffect, useState } from "react";
import "./App.css";
import NoteForm from "./components/NoteForm";
import NoteGrid from "./components/NoteGrid";
import type NoteType from "./types/note";

const URL = process.env.REACT_APP_API_BASE_URL || "";

function App() {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [selectedNote, setSelectedNote] = useState<NoteType | null>(null);
  const [connectionIssue, setConnectionIssue] = useState<boolean>(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch(URL);
      const data: NoteType[] = await response.json();
      setNotes(data);
    } catch (error) {
      console.log(error);
      setConnectionIssue(true)
    }
  };

  const addNote = async (newNote: NoteType) => {
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: newNote.title,
            content: newNote.content
        }),
      });
      await response.json();
      await fetchNotes();
    } catch (error) {
      console.error(error);
    }
  };

  const updateNote = async (updatedNote: NoteType) => {

    try {
      const response = await fetch(`${URL}/${updatedNote.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: updatedNote.title,
          content: updatedNote.content,
        }),
      });
      await response.json();
      fetchNotes();
    } catch (error) {
      console.error(error);
      setConnectionIssue(true)
    }
  };

  const deleteNote = async (noteId: number) => {

    try {
      const response = await fetch(`${URL}/${noteId}`, {
        method: "DELETE",
      });
      await response.json();
      fetchNotes();
    } catch (error) {
      console.error(error);
      setConnectionIssue(true)
    }
  }

  const handleEdit = (note: NoteType) => {
    setSelectedNote(note);
  };

  const handleCancel = () => {
    setSelectedNote(null);
  };

  return (
    <div className="AppContainer">
      <h1>Notes App</h1>
      {connectionIssue && <h3 className='connection-warning'>Warning: API Connection Issue</h3>}
      <NoteForm onCancel={handleCancel} selectedNote={selectedNote} addNote={addNote} updateNote={updateNote} />
      <NoteGrid deleteNote={deleteNote} notes={notes} handleEdit={handleEdit}/>
    </div>
  );
}

export default App;
