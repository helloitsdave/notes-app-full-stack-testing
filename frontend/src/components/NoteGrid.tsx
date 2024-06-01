import Note from './Note';
import type NoteType from '../types/note';

interface NotesListProps {
  notes: NoteType[];
  handleEdit: (note: NoteType) => void;
  deleteNote: (noteId: string) => void;
}

const NoteGrid: React.FC<NotesListProps> = ({
  notes,
  handleEdit,
  deleteNote,
}) => {
  return (
    <div className="notes-list">
      <div className="notes-grid">
        {notes.length === 0 && (
          <div className="notes-grid-welcome">
            <h2>Welcome to e-notes!</h2>
            <p>Click above to add your first note</p>
          </div>
        )}
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            handleEdit={() => handleEdit(note)}
            deleteNote={() => deleteNote(note.id as string)}
          />
        ))}
      </div>
    </div>
  );
};

export default NoteGrid;
