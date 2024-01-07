import { render, screen } from "@testing-library/react";
import NoteForm from "./NoteForm";

describe("NoteForm", () => {
    test("renders the form correctly", () => {
        render(<NoteForm addNote={() => { } } updateNote={() => { } } selectedNote={null} onCancel={function (): void {
            throw new Error("Function not implemented.");
        } } />);

        // Assert that the form elements are rendered correctly
        expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Content")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Add Note" })).toBeInTheDocument();
    });
});