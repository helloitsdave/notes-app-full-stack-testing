import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { mswServer } from "./setupTests";
import { errorHandlers } from "./mocks/handlers"; 


test("Notes App loads with notes", async () => {
    render(<App />);

    expect(await screen.findByRole("heading", { name: "Notes App" })).toBeInTheDocument();

    expect(screen.queryByTestId('spinner-container')).not.toBeInTheDocument();

    expect(await screen.findByText("Test Title Note 1")).toBeInTheDocument();
    expect(await screen.findByText("Test Content 1")).toBeInTheDocument();
    expect(await screen.findByText("Test Title Note 2")).toBeInTheDocument();
    expect(await screen.findByText("Test Content 2")).toBeInTheDocument();
});

test('User can select and update note', async () => { 
    render(<App />);

    expect(await screen.findByRole("heading", { name: "Notes App" })).toBeInTheDocument();

    expect(await screen.findByText("Test Title Note 1")).toBeInTheDocument();
    // Click on the first note
    screen.getByText("Test Title Note 1").click();

    // Check that the note has been selected
    expect(await screen.findByText("Save")).toBeInTheDocument();
    expect(await screen.findByText("Cancel")).toBeInTheDocument();

    const titleInput = await screen.findByPlaceholderText("Title");
    const contentInput = await screen.findByPlaceholderText("Content");
    const saveButton = await screen.findByRole("button", { name: "Save" });
  
    // Fill in the note form
    userEvent.type(titleInput, " Updated");
    userEvent.type(contentInput, " Updated");
    userEvent.click(saveButton);

    expect(await screen.findByText("Test Title Note 1 Updated")).toBeInTheDocument();
    expect(await screen.findByText("Test Content 1 Updated")).toBeInTheDocument();

});

test('User can add a new note', async () => {
  render(<App />);

  expect(await screen.findByRole("heading", { name: "Notes App" })).toBeInTheDocument();

  // Fill in the note form
  const titleInput = await screen.findByPlaceholderText("Title");
  const contentInput = await screen.findByPlaceholderText("Content");
  const saveButton = await screen.findByRole("button", { name: "Add Note" });

  userEvent.type(titleInput, "New Added Note Title");
  userEvent.type(contentInput, "New Note Content");
  userEvent.click(saveButton);


  // Check that the new note is added to the list
  const addedNoteTitle = await screen.findByText("New Added Note Title");
  const addedNoteContent = await screen.findByText("New Note Content");

  expect(addedNoteTitle).toBeInTheDocument();
  expect(addedNoteContent).toBeInTheDocument();
});

test('User can delete a note', async () => { 
  render(<App />);

  expect(await screen.findByRole("heading", { name: "Notes App" })).toBeInTheDocument();

  // Click on the first note
  screen.getByText("Test Title Note 2").click();

  // Check that the note has been selected
  expect(await screen.findByText("Save")).toBeInTheDocument();
  expect(await screen.findByText("Cancel")).toBeInTheDocument();

  const notes = await screen.findAllByTestId("note");
  expect(notes).toHaveLength(3);

  const deleteButton = within(notes[0]).getByTestId("note-delete-button");
  userEvent.click(deleteButton);

  // Check that the note has been deleted
  await waitFor(async () => {
    expect(await screen.findAllByTestId("note")).toHaveLength(2);
  });
});

test('Connection Error is displayed on Notes fetch', async () => { 
  mswServer.use(...errorHandlers);

  render(<App />);

  expect(await screen.findByRole("heading", { name: "Warning: API Connection Issue"})).toBeInTheDocument();
});

test('Connection Error is displayed on Create Note', async () => { 
  // Render the App component
  render(<App />);

  expect(await screen.findByRole("heading", { name: "Notes App" })).toBeInTheDocument();

  // Fill in the note form
  const titleInput = await screen.findByPlaceholderText("Title");
  const contentInput = await screen.findByPlaceholderText("Content");
  const saveButton = await screen.findByRole("button", { name: "Add Note" });

  mswServer.use(...errorHandlers);

  userEvent.type(titleInput, "New Added Note Title");
  userEvent.type(contentInput, "New Note Content");
  userEvent.click(saveButton);

  expect(await screen.findByRole("heading", { name: "Warning: API Connection Issue"})).toBeInTheDocument();
});

test('Connection Error is displayed on Delete Note', async () => { 
  render(<App />);

  expect(await screen.findByRole("heading", { name: "Notes App" })).toBeInTheDocument();

  mswServer.use(...errorHandlers);

  const deleteButton = await screen.findAllByTestId("note-delete-button");
  userEvent.click(deleteButton[0]);

  expect(await screen.findByRole("heading", { name: "Warning: API Connection Issue"})).toBeInTheDocument();
});

test('Connection Error is displayed on Update Note', async () => {
  render(<App />);

  expect(await screen.findByRole("heading", { name: "Notes App" })).toBeInTheDocument();

  // Click on the first note
  const notes = await screen.findAllByTestId("note");
  userEvent.click(notes[0]);

  // Check that the note has been selected
  expect(await screen.findByText("Save")).toBeInTheDocument();

  const saveButton = await screen.findByRole("button", { name: "Save" });

  mswServer.use(...errorHandlers);

  userEvent.click(saveButton);

  expect(await screen.findByRole("heading", { name: "Warning: API Connection Issue"})).toBeInTheDocument();
});