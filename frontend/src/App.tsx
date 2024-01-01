import React, { useEffect, useState } from "react";
import "./App.css";

const ENDPOINT = "http://localhost:5001/api/notes";

type Note = {
  id?: number;
  title: string;
  content: string;
};

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [connectionIssue, setConnectionIssue] = useState<boolean>(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch(ENDPOINT);
      const data: Note[] = await response.json();
      setNotes(data);
    } catch (error) {
      console.log(error);
      setConnectionIssue(true)
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });
      const data = await response.json();
      setNotes((prevNotes: Note[]) => [...prevNotes, data]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error(error);
      setConnectionIssue(true)
    }
  };

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const renderNoteGrid = () => {
    return(<div className="notes-grid">
    {notes.map((note) => (
      <div className="note-item" onClick={() => handleNoteClick(note)}>
        <div className="notes-header">
          <button
            onClick={(event) => {
              deleteNote(event, note.id || 0);
            }}
          >
            x
          </button>
        </div>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
      </div>
    ))}
  </div>)
  }

  const handleUpdateNote = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedNote) {
      return;
    }

    try {
      const response = await fetch(`${ENDPOINT}/${selectedNote.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });
      const data = await response.json();

      const updatedNotesList = notes.map((note) =>
      note.id === selectedNote.id ? data : note
      )

    setNotes(updatedNotesList);
    setTitle("");
    setContent("");
    setSelectedNote(null);
    } catch (error) {
      console.error(error);
      setConnectionIssue(true)
    };
  }

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const deleteNote = async (event: React.MouseEvent, noteId: number) => {
    event.stopPropagation();

    try {
      await fetch(`${ENDPOINT}/${noteId}`, {
        method: "DELETE",
      });
      const updatedNotes = notes.filter((note) => note.id !== noteId);

      setNotes(updatedNotes);
    } catch (e) {
      console.log(e);
      setConnectionIssue(true)
    }
  };

  return (
    <div className="AppContainer">
      <h1>Notes App</h1>
      {connectionIssue && <h3 className='connection-warning'>Warning: API Connection Issue</h3>}
      <form
        className="note-form"
        onSubmit={(event) =>
          selectedNote ? handleUpdateNote(event) : handleAddNote(event)
        }
      >
        <input
          type="text"
          onChange={(event) => setTitle(event?.target?.value)}
          required
          placeholder="Title"
          value={title}
        />
        <textarea
          required
          onChange={(event) => setContent(event?.target?.value)}
          placeholder="Content"
          rows={10}
          value={content}
        />
        {selectedNote ? (
          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button type="submit">Add Note</button>
        )}
      </form>
      {renderNoteGrid()}
    </div>
  );
}

export default App;
