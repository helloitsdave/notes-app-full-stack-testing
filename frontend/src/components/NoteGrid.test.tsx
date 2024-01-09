import { render, screen } from "@testing-library/react";
import NoteGrid from "./NoteGrid";
describe("NoteGrid", () => {
  test("Should see the Notes Title and Rendered Note", () => {
    render(
      <NoteGrid
        notes={[
          {
            id: 1,
            title: "Test Title",
            content: "Test Content",
          },
        ]}
        handleEdit={() => {}}
        deleteNote={() => {}}
      />
    );
    expect(screen.getByRole("heading", { name: "Notes" })).toBeInTheDocument();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });
  test("Should not see the Notes Title Rendered when no notes present", () => {
    render(<NoteGrid notes={[]} handleEdit={() => {}} deleteNote={() => {}} />);
    expect(
      screen.queryByRole("heading", { name: "Notes" })
    ).not.toBeInTheDocument();
  });
});
