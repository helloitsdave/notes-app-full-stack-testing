import { Modal } from 'antd';
import NoteForm from './NoteForm';
import type NoteType from '../types/note';

interface ModalNoteFormProps {
  addNote: (newNote: NoteType) => void;
  updateNote: (updatedNote: NoteType) => void;
  selectedNote: NoteType | null;
  handleCancel: () => void;
  isModalVisible: boolean;
}

const ModalNoteForm: React.FC<ModalNoteFormProps> = (props) => {
  return (
    <Modal
      title="Note Form"
      open={props.isModalVisible}
      onCancel={props.handleCancel}
      footer={null}
    >
      <NoteForm
        onCancel={props.handleCancel}
        selectedNote={props.selectedNote}
        addNote={props.addNote}
        updateNote={props.updateNote}
      />
    </Modal>
  );
};

export default ModalNoteForm;
