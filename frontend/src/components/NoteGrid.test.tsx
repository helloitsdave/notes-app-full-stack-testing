import { render, screen } from "@testing-library/react";
import NoteGrid from "./NoteGrid";
describe("NoteGrid", () => {
  test("Should see the Notes Title and Rendered Note", () => {
    render(
      <NoteGrid
        notes={[
          {
            id: "0a97f1c3-294e-43e8-b78f-60209e972ee9",
            title: "Test Title",
            content: "Test Content",
          },
        ]}
        handleEdit={() => {}}
        deleteNote={() => {}}
      />
    );
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
