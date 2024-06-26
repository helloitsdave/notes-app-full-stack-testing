import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NoteApp from './NoteApp';
import { mswServer } from './setupTests';
import { errorHandlers } from './mocks/handlers';

test('Notes NoteApp loads with notes', async () => {
  render(<NoteApp onLogout={() => {}} />);

  expect(
    await screen.findByTestId('spinner-container'),
  ).not.toBeInTheDocument();

  expect(await screen.findByText('Test Title Note 1')).toBeInTheDocument();
  expect(await screen.findByText('Test Content 1')).toBeInTheDocument();
  expect(await screen.findByText('Test Title Note 2')).toBeInTheDocument();
  expect(await screen.findByText('Test Content 2')).toBeInTheDocument();
});

test('User can select and update note', async () => {
  render(<NoteApp onLogout={() => {}} />);

  expect(await screen.findByText('Test Title Note 1')).toBeInTheDocument();
  // Click on the first note
  screen.getByText('Test Title Note 1').click();

  // Check that the note has been selected
  expect(await screen.findByText('Save')).toBeInTheDocument();
  expect(await screen.findByText('Cancel')).toBeInTheDocument();

  const titleInput = await screen.findByPlaceholderText('Title');
  const contentInput = await screen.findByPlaceholderText('Content');
  const saveButton = await screen.findByRole('button', { name: 'Save' });

  // Fill in the note form
  userEvent.type(titleInput, ' Updated');
  userEvent.type(contentInput, ' Updated');
  userEvent.click(saveButton);

  expect(
    await screen.findByText('Test Title Note 1 Updated'),
  ).toBeInTheDocument();
  expect(await screen.findByText('Test Content 1 Updated')).toBeInTheDocument();
});

test('User can add a Add a note', async () => {
  render(<NoteApp onLogout={() => {}} />);

  const addButton = await screen.findByRole('button', { name: 'Add a note' });
  userEvent.click(addButton);
  // Fill in the note form
  const titleInput = await screen.findByPlaceholderText('Title');
  const contentInput = await screen.findByPlaceholderText('Content');
  const saveButton = await screen.findByRole('button', { name: 'Add Note' });

  userEvent.type(titleInput, 'New Added Note Title');
  userEvent.type(contentInput, 'Add a note Content');
  userEvent.click(saveButton);

  // Check that the Add a note is added to the list
  const addedNoteTitle = await screen.findByText('New Added Note Title');
  const addedNoteContent = await screen.findByText('Add a note Content');

  expect(addedNoteTitle).toBeInTheDocument();
  expect(addedNoteContent).toBeInTheDocument();
});

test('User can delete a note', async () => {
  render(<NoteApp onLogout={() => {}} />);

  // Click on the first note
  const noteTitle = await screen.findByText('Test Title Note 2');
  noteTitle.click();

  // Check that the note has been selected
  expect(await screen.findByText('Save')).toBeInTheDocument();
  expect(await screen.findByText('Cancel')).toBeInTheDocument();

  const notes = await screen.findAllByTestId('note');
  expect(notes).toHaveLength(3);

  const deleteButton = within(notes[0]).getByTestId('note-delete-button');
  userEvent.click(deleteButton);

  // Check that the note has been deleted
  await waitFor(async () => {
    expect(await screen.findAllByTestId('note')).toHaveLength(2);
  });
});

test('Connection Error is displayed on Notes fetch', async () => {
  mswServer.use(...errorHandlers);

  render(<NoteApp onLogout={() => {}} />);

  expect(
    await screen.findByRole('heading', {
      name: 'Warning: API Connection Issue',
    }),
  ).toBeInTheDocument();
});

test('Connection Error is displayed on Create Note', async () => {
  // Render the NoteApp component
  render(<NoteApp onLogout={() => {}} />);

  const addButton = await screen.findByRole('button', { name: 'Add a note' });
  userEvent.click(addButton);
  // Fill in the note form
  const titleInput = await screen.findByPlaceholderText('Title');
  const contentInput = await screen.findByPlaceholderText('Content');
  const saveButton = await screen.findByRole('button', { name: 'Add Note' });

  mswServer.use(...errorHandlers);

  userEvent.type(titleInput, 'New Added Note Title');
  userEvent.type(contentInput, 'Add a note Content');
  userEvent.click(saveButton);

  expect(
    await screen.findByRole('heading', {
      name: 'Warning: API Connection Issue',
    }),
  ).toBeInTheDocument();
});

// test('Connection Error is displayed on Delete Note', async () => {
//   render(<NoteApp />);

//   mswServer.use(...errorHandlers);

//   const deleteButton = await screen.findAllByTestId("note-delete-button");
//   userEvent.click(deleteButton[0]);

//   expect(await screen.findByRole("heading", { name: "Warning: API Connection Issue"})).toBeInTheDocument();
// });

test('Connection Error is displayed on Update Note', async () => {
  render(<NoteApp onLogout={() => {}} />);

  // Click on the first note
  const notes = await screen.findAllByTestId('note');
  userEvent.click(notes[0]);

  // Check that the note has been selected
  expect(await screen.findByText('Save')).toBeInTheDocument();

  const saveButton = await screen.findByRole('button', { name: 'Save' });

  mswServer.use(...errorHandlers);

  userEvent.click(saveButton);

  expect(
    await screen.findByRole('heading', {
      name: 'Warning: API Connection Issue',
    }),
  ).toBeInTheDocument();
});

test('User can logout', async () => {
  const onLogout = vitest.fn();
  render(<NoteApp onLogout={onLogout} />);

  const logoutButton = await screen.findByRole('button', { name: 'Logout' });
  userEvent.click(logoutButton);

  expect(onLogout).toHaveBeenCalledTimes(1);
});
