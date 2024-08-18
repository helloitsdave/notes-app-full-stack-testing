import { Modal } from 'antd';
import dayjs from 'dayjs';
import UserType from '../types/user';

interface UserModalProps {
  isModalVisible: boolean;
  handleCancel: () => void;
  user: UserType | null;
}

const dateFormat = 'DD MMM YYYY HH:mm';

const UserModal: React.FC<UserModalProps> = (props) => {
  return (
    <Modal
      title="User Information"
      open={props.isModalVisible}
      onCancel={props.handleCancel}
      footer={null}
    >
      {props.user ? (
        <div className="user-info-container" data-testid="user-info-modal">
          <p data-testid="user-info-username">
            <strong>Username:</strong> {props.user?.username}
          </p>
          <p data-testid="user-info-email">
            <strong>Email:</strong> {props.user?.email}
          </p>
          <p data-testid="user-info-created-at">
            <strong>Created:</strong>{' '}
            {dayjs(props.user?.createdAt).format(dateFormat)}
          </p>
          <p data-testid="user-info-updated-at">
            <strong>Last updated:</strong>{' '}
            {dayjs(props.user?.updatedAt).format(dateFormat)}
          </p>
        </div>
      ) : (
        <p data-testid="user-info-error">
          <strong>Error: No user information available</strong>
        </p>
      )}
    </Modal>
  );
};

export default UserModal;
