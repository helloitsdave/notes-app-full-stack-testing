import React, { useEffect, useState } from 'react';
import type NoteType from '../types/note';

interface NoteFormProps {
  addNote: (newNote: NoteType) => void;
  updateNote: (updatedNote: NoteType) => void;
  selectedNote: NoteType | null;
  onCancel: () => void;
}

const NoteForm: React.FC<NoteFormProps> = (props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (props.selectedNote) {
      setTitle(props.selectedNote.title);
      setContent(props.selectedNote.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [props.selectedNote]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newNote = { title, content };

    if (props.selectedNote) {
      // Update existing note
      props.updateNote({ ...props.selectedNote, ...newNote });
    } else {
      // Add new note
      props.addNote(newNote);
    }

    setTitle('');
    setContent('');
    props.onCancel(); // Reset selectedNote and switch back to add mode
  };

  return (
    <div>
      <form className="note-form" onSubmit={handleSubmit}>
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
        <button type="submit">
          {props.selectedNote ? 'Save' : 'Add Note'}
        </button>
        {props.selectedNote && (
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default NoteForm;
