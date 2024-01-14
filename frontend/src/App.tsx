import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import NoteForm from "./components/NoteForm";
import NoteGrid from "./components/NoteGrid";
import Spinner from "./components/Spinner";
import type NoteType from "./types/note";

const URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api/notes";

function App() {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [selectedNote, setSelectedNote] = useState<NoteType | null>(null);
  const [connectionIssue, setConnectionIssue] = useState<boolean>(false);
  const [isDataLoading, setIsDataLoading] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setIsDataLoading(true);
      const response = await axios.get(URL);
      const data: NoteType[] = await response.data;
      setIsDataLoading(false);
      setNotes(data);
    } catch (error) {
      console.log(error);
      setConnectionIssue(true);
      setIsDataLoading(false);
    }
  };

  const addNote = async (newNote: NoteType) => {
    try {
      setIsDataLoading(true);
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
      await response.data;
      setIsDataLoading(false);
      await fetchNotes();
    } catch (error) {
      console.error(error);
      setConnectionIssue(true);
      setIsDataLoading(false);
    }
  };

  const updateNote = async (updatedNote: NoteType) => {
    try {
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
      await response.data;
      fetchNotes();
    } catch (error) {
      console.error(error);
      setConnectionIssue(true);
      setIsDataLoading(false);
    }
  };

  const deleteNote = async (noteId: number) => {
    try {
      const response = await axios.delete(`${URL}/${noteId}`);
      await response.data;
      fetchNotes();
    } catch (error) {
      console.error(error);
      setConnectionIssue(true);
      setIsDataLoading(false);
    }
  };

  const handleEdit = (note: NoteType) => {
    setSelectedNote(note);
  };

  const handleCancel = () => {
    setSelectedNote(null);
  };

  return (
    <div className="app-container">
      <h1>Notes App</h1>
      {connectionIssue && (
        <h3 className="connection-warning">Warning: API Connection Issue</h3>
      )}
      <NoteForm
        onCancel={handleCancel}
        selectedNote={selectedNote}
        addNote={addNote}
        updateNote={updateNote}
      />
      {isDataLoading ? (
        <Spinner />
      ) : (
        <NoteGrid
          deleteNote={deleteNote}
          notes={notes}
          handleEdit={handleEdit}
        />
      )}
    </div>
  );
}

export default App;
