import React, { useEffect, useState } from "react";
import "./App.css";
import NoteForm from "./components/NoteForm";
import NoteGrid from "./components/NoteGrid";
import type Note from "./types/note";

const URL = process.env.REACT_APP_API_BASE_URL || "";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [connectionIssue, setConnectionIssue] = useState<boolean>(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch(URL);
      const data: Note[] = await response.json();
      setNotes(data);
    } catch (error) {
      console.log(error);
      setConnectionIssue(true)
    }
  };

  const handleNoteClick = (note: Note | null) => {
    setSelectedNote (note)
  }

  return (
    <div className="AppContainer">
      <h1>Notes App</h1>
      {connectionIssue && <h3 className='connection-warning'>Warning: API Connection Issue</h3>}
      <NoteForm onNoteChange={fetchNotes} onNoteClick={handleNoteClick} selectedNote={selectedNote} />
      <NoteGrid onNoteChange={fetchNotes} notes={notes} onNoteClick={handleNoteClick}/>;
    </div>
  );
}

export default App;
