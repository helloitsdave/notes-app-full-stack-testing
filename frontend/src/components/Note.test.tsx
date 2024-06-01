import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Note from './Note';

describe('Note', () => {
  test('Should see the Note Title and Content', () => {
    render(
      <Note
        note={{
          id: '0a97f1c3-294e-43e8-b78f-60209e972ee9',
          title: 'Test Title',
          content: 'Test Content',
        }}
        handleEdit={() => {}}
        deleteNote={() => {}}
      />,
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
  test('Should call deleteNote when delete button is clicked', () => {
    const deleteNote = vi.fn();
    render(
      <Note
        note={{
          id: '0a97f1c3-294e-43e8-b78f-60209e972ee9',
          title: 'Test Title',
          content: 'Test Content',
        }}
        handleEdit={() => {}}
        deleteNote={deleteNote}
      />,
    );
    userEvent.click(screen.getByTestId('note-delete-button'));
    expect(deleteNote).toHaveBeenCalledTimes(1);
  });
  test('Should call handleEdit when note is clicked', () => {
    const handleEdit = vi.fn();
    render(
      <Note
        note={{
          id: '0a97f1c3-294e-43e8-b78f-60209e972ee9',
          title: 'Test Title',
          content: 'Test Content',
        }}
        handleEdit={handleEdit}
        deleteNote={() => {}}
      />,
    );
    userEvent.click(screen.getByText('Test Title'));
    expect(handleEdit).toHaveBeenCalledTimes(1);
  });
});
