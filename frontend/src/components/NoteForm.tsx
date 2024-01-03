import React, { useEffect, useState } from "react";
import type Note from ".././types/note";

const URL = process.env.REACT_APP_API_BASE_URL || "";

interface NoteFormProps {
  onNoteChange: () => void;
  selectedNote?: Note | null;
  onNoteClick: (note: Note | null) => void;
}

const NoteForm: React.FC<NoteFormProps> = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });
      await response.json();
      props.onNoteChange();
      setTitle("");
      setContent("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateNote = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!props.selectedNote) {
      return;
    }

    setTitle(props.selectedNote.title);
    setContent(props.selectedNote.content);

    try {
      const response = await fetch(`${URL}/${props.selectedNote.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });
      await response.json();

      props.onNoteChange();

      setTitle("");
      setContent("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (props.selectedNote) {
      setTitle(props.selectedNote.title);
      setContent(props.selectedNote.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [props.selectedNote]);

  return (
    <div>
      <form
        className="note-form"
        onSubmit={(event) =>
          props.selectedNote ? handleUpdateNote(event) : handleAddNote(event)
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
        {props.selectedNote ? (
          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button onClick={() => props.onNoteClick(null)}>Cancel</button>
          </div>
        ) : (
          <button type="submit">Add Note</button>
        )}
      </form>
    </div>
  );
};

export default NoteForm;
