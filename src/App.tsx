import React, { useState } from 'react';
import './App.css';

type Note = {
  id: number;
  title: string;
  content: string;
};

const initialNotes: Note[] = [
  {
    id: 1,
    title: "test note 1",
    content: "bla bla note1",
  },
  {
    id: 2,
    title: "test note 2 ",
    content: "bla bla note2",
  },
  {
    id: 3,
    title: "test note 3",
    content: "bla bla note3",
  },
  {
    id: 4,
    title: "test note 4 ",
    content: "bla bla note4",
  },
  {
    id: 5,
    title: "test note 5",
    content: "bla bla note5",
  },
  {
    id: 6,
    title: "test note 6",
    content: "bla bla note6",
  },
];


function App() {

  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);


  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    const newNote: Note = {
      id: notes.length + 1,
      title,
      content
    };
    setNotes((prevNotes: Note[]) => [...prevNotes, newNote]);
    setTitle("");
    setContent("");
  };

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  }

  const handleUpdateNote = (event: React.FormEvent) => {
    event.preventDefault();
  
    if (!selectedNote) {
      return;
    }
  
    const updatedNote: Note = {
      id: selectedNote.id,
      title: title,
      content: content,
    };
  
    const updatedNotesList = notes.map((note) => (note.id === selectedNote.id ? updatedNote : note));
  
    setNotes(updatedNotesList);
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const deleteNote = (event: React.MouseEvent, noteId: number) => {
    event.stopPropagation();
  
    const updatedNotes = notes.filter((note) => note.id !== noteId);
  
    setNotes(updatedNotes);
  };

  
  return (
    <div className="AppContainer">
      <form className="note-form" onSubmit={(event) => selectedNote ? handleUpdateNote(event) :handleAddNote(event)}>
        <input type="text" onChange={(event) => setTitle(event?.target?.value)} required placeholder="Title" value={title}/>
        <textarea required onChange={(event) => setContent(event?.target?.value)} placeholder="Content" rows={10} value={content} />
        {selectedNote ? (
        <div className="edit-buttons">
          <button type="submit">Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <button type="submit">Add Note</button>
      )}
      </form>
      <div className="notes-grid">
            {notes.map((note) => (
              <div className="note-item" onClick={() => handleNoteClick(note)}>
                <div className="notes-header">
                  <button onClick={(event) => {deleteNote(event, note.id)}}>x</button>
                </div>
                <h2>{note.title}</h2>
                <p>{note.content}</p>
              </div>
            ))}
      </div>
    </div> 
  );
}

export default App;
