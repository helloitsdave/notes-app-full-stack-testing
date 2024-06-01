import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NoteForm from './NoteForm';

describe('NoteForm', () => {
  test('Should see Title, Content and Add Note Button', () => {
    render(
      <NoteForm
        addNote={() => {}}
        updateNote={() => {}}
        selectedNote={null}
        onCancel={function (): void {
          throw new Error('Function not implemented.');
        }}
      />,
    );

    // Assert that the form elements are rendered correctly
    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Content')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Add Note' }),
    ).toBeInTheDocument();
  });

  test('Should see selected Note title and content in the form', () => {
    render(
      <NoteForm
        addNote={() => {}}
        updateNote={() => {}}
        selectedNote={{
          id: '0a97f1c3-294e-43e8-b78f-60209e972ee9',
          title: 'Selected Title',
          content: 'Selected Test Content',
        }}
        onCancel={() => {}}
      />,
    );
    const titleInput: HTMLInputElement = screen.getByPlaceholderText('Content');
    const contentInput: HTMLInputElement = screen.getByPlaceholderText('Title');
    // Then the title and content fields should be updated
    expect(titleInput.value).toBe('Selected Test Content');
    expect(contentInput.value).toBe('Selected Title');
  });

  test('Should be able to update the Title and Content', () => {
    render(
      <NoteForm
        addNote={() => {}}
        updateNote={() => {}}
        selectedNote={null}
        onCancel={() => {}}
      />,
    );
    const titleInput: HTMLInputElement = screen.getByPlaceholderText('Content');
    const contentInput: HTMLInputElement = screen.getByPlaceholderText('Title');

    // Then the title and content fields should be updated

    // When user enters text in the title and content inputs
    userEvent.type(titleInput, 'New Title');
    userEvent.type(contentInput, 'New Content');
    /* fire events that update state */

    expect(titleInput.value).toBe('New Title');
    expect(contentInput.value).toBe('New Content');
  });

  test('Should be able to call the Creation of a new Note', () => {
    const addNoteMock = vi.fn();
    render(
      <NoteForm
        addNote={addNoteMock}
        updateNote={() => {}}
        selectedNote={null}
        onCancel={() => {}}
      />,
    );
    const titleInput: HTMLInputElement = screen.getByPlaceholderText('Title');
    const contentInput: HTMLInputElement =
      screen.getByPlaceholderText('Content');
    const addNoteButton: HTMLButtonElement = screen.getByRole('button', {
      name: 'Add Note',
    });

    // When user enters text in the title and content inputs
    userEvent.type(titleInput, 'New Title');
    userEvent.type(contentInput, 'New Content');
    userEvent.click(addNoteButton);

    // Then the addNote function should be called with the new note
    expect(addNoteMock).toHaveBeenCalledWith({
      title: 'New Title',
      content: 'New Content',
    });
  });

  test('Should be able to call the Update of a Note', () => {
    const updateNoteMock = vi.fn();
    render(
      <NoteForm
        addNote={() => {}}
        updateNote={updateNoteMock}
        selectedNote={{
          id: '0a97f1c3-294e-43e8-b78f-60209e972ee9',
          title: 'Selected Test Title',
          content: 'Selected Test Content',
        }}
        onCancel={() => {}}
      />,
    );
    const titleInput: HTMLInputElement = screen.getByPlaceholderText('Title');
    const contentInput: HTMLInputElement =
      screen.getByPlaceholderText('Content');
    const saveButton: HTMLButtonElement = screen.getByRole('button', {
      name: 'Save',
    });

    expect(saveButton).toBeInTheDocument();
    // When user enters text in the title and content inputs
    userEvent.type(titleInput, ' Updated');
    userEvent.type(contentInput, ' Updated');
    userEvent.click(saveButton);

    // Then the addNote function should be called with the new note
    expect(updateNoteMock).toHaveBeenCalledWith({
      id: '0a97f1c3-294e-43e8-b78f-60209e972ee9',
      title: 'Selected Test Title Updated',
      content: 'Selected Test Content Updated',
    });
  });

  test('Should be able to cancel a selected note', () => {
    const onCancelMock = vi.fn();
    render(
      <NoteForm
        addNote={() => {}}
        updateNote={() => {}}
        selectedNote={{
          id: '0a97f1c3-294e-43e8-b78f-60209e972ee9',
          title: 'Selected Test Title',
          content: 'Selected Test Content',
        }}
        onCancel={onCancelMock}
      />,
    );
    const cancelButton: HTMLButtonElement = screen.getByRole('button', {
      name: 'Save',
    });

    expect(cancelButton).toBeInTheDocument();
    // When user enters text in the title and content inputs
    userEvent.click(cancelButton);

    // Then the addNote function should be called with the new note
    expect(onCancelMock).toHaveBeenCalled();
  });
});
