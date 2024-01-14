import type NoteType from "../types/note";

interface NoteProps {
    note: NoteType;
    handleEdit: () => void;
    deleteNote: () => void;
}

const Note: React.FC<NoteProps> = ({ note, handleEdit, deleteNote }) => {

    const handleDeleteMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
        // Prevent the click event from propagating to the parent container
        e.stopPropagation();

        // Call the deleteNote function
        deleteNote();
    };
    return (
        <div data-testid="note" className="note-item" onClick={handleEdit}>
            <h3 data-testid="note-title">{note.title}</h3>
            <p className="note-content" data-testid="note-content">{note.content}</p>
            <div className="notes-header">
                    <button data-testid='note-delete-button' onClick={handleDeleteMouseDown}>X</button>
            </div>
        </div>
    );
};

export default Note;
