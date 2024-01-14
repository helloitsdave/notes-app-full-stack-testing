import Note from "./Note";
import type NoteType from "../types/note";

interface NotesListProps {
  notes: NoteType[];
  handleEdit: (note: NoteType) => void;
  deleteNote: (noteId: number) => void;
}

const NoteGrid: React.FC<NotesListProps> = ({
  notes,
  handleEdit,
  deleteNote,
}) => {
  return (
    <div className='notes-list'>
      <header>{notes.length > 0 && <h2 className="notes-grid-header">Notes</h2>}</header>
      <div className="notes-grid">
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            handleEdit={() => handleEdit(note)}
            deleteNote={() => deleteNote(Number(note.id))}
          />
        ))}
      </div>
    </div>
  );
};

export default NoteGrid;
