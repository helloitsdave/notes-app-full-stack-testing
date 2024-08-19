import { useEffect, useState } from 'react';
import { Button } from 'antd';
import './App.css';
import NoteFormModal from './components/NoteFormModal';
import NoteGrid from './components/NoteGrid';
import Spinner from './components/Spinner';
import UserModal from './components/UserModal';
import type NoteType from './types/note';
import type UserType from './types/user';
import {
  postNote,
  patchNote,
  getNotes,
  removeNote,
  getUser,
} from './api/apiService';

export interface LogoutProps {
  onLogout: () => void;
}

const NoteApp: React.FC<LogoutProps> = ({ onLogout }) => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [selectedNote, setSelectedNote] = useState<NoteType | null>(null);
  const [connectionIssue, setConnectionIssue] = useState<boolean>(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    fetchNotes();
    getUserInfo();
  }, []);

  const fetchNotes = async () => {
    try {
      setIsDataLoading(true);
      const response = await getNotes();
      const data: NoteType[] = await response.data;
      setIsDataLoading(false);
      setNotes(data);
    } catch (error) {
      console.log(error);
      setConnectionIssue(true);
      setIsDataLoading(false);
    }
  };

  const addNote = async (newNote: NoteType) => {
    try {
      setIsDataLoading(true);
      const response = await postNote(newNote);
      await response.data;
      setIsDataLoading(false);
      await fetchNotes();
    } catch (error) {
      console.error(error);
      setConnectionIssue(true);
      setIsDataLoading(false);
    }
  };

  const updateNote = async (updatedNote: NoteType) => {
    try {
      const response = await patchNote(updatedNote);
      if ('data' in response) {
        await response.data;
      }
      fetchNotes();
    } catch (error) {
      console.error(error);
      setConnectionIssue(true);
      setIsDataLoading(false);
    }
  };

  const deleteNote = async (noteId: string) => {
    try {
      const response = await removeNote(noteId);
      await response.data;
      fetchNotes();
    } catch (error) {
      console.error(error);
      setConnectionIssue(true);
      setIsDataLoading(false);
    }
  };

  const getUserInfo = async () => {
    try {
      const response = await getUser();
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (note: NoteType) => {
    setSelectedNote(note);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setSelectedNote(null);
    setIsModalVisible(false);
    setIsUserModalVisible(false);
  };

  return (
    <div className="app-container" data-testid="note-app">
      <div className="action-header">
        <Button
          className="add-note-button"
          type="primary"
          style={{ marginBottom: '20px' }}
          onClick={() => setIsModalVisible(true)}
        >
          Add a note
        </Button>
        <Button
          className="view-profile-button"
          type="primary"
          style={{ marginBottom: '20px' }}
          onClick={() => setIsUserModalVisible(true)}
        >
          Profile
        </Button>
        <Button
          className="logout-button"
          type="primary"
          style={{ marginBottom: '20px' }}
          onClick={() => onLogout()}
        >
          Logout
        </Button>
      </div>

      {connectionIssue && (
        <h3 className="connection-warning">Warning: API Connection Issue</h3>
      )}

      <NoteFormModal
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        selectedNote={selectedNote}
        addNote={addNote}
        updateNote={updateNote}
      />

      {isDataLoading ? (
        <Spinner />
      ) : (
        <NoteGrid
          deleteNote={deleteNote}
          notes={notes}
          handleEdit={handleEdit}
        />
      )}

      <UserModal
        isModalVisible={isUserModalVisible}
        handleCancel={handleCancel}
        user={user}
      />
    </div>
  );
};

export default NoteApp;
