import type Note from ".././types/note";

const URL = process.env.REACT_APP_API_BASE_URL || "";

type NoteGridProps = {
    notes: Note[];
    onNoteChange: () => void;
    onNoteClick: (note: Note) => void;
}

const NoteGrid = (props: NoteGridProps) => {
    
      const deleteNote = async (event: React.MouseEvent, noteId: number) => {
        event.stopPropagation();
    
        try {
          await fetch(`${URL}/${noteId}`, {
            method: "DELETE",
          });
    
          props.onNoteChange();
        } catch (e) {
          console.log(e);
          // setConnectionIssue(true)
        }
      };
    
    return (
    <div className="notes-grid">
        {props.notes.map((note: Note) => (
          <div className="note-item" onClick={() => props.onNoteClick(note)}>
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
      </div>
    )

}

export default NoteGrid;