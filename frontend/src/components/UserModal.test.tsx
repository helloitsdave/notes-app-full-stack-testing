import { render, screen } from '@testing-library/react';
import UserModal from './UserModal';

describe('UserModal', () => {
  test('should see User Information when present', () => {
    render(
      <UserModal
        isModalVisible={true}
        handleCancel={() => {}}
        user={{
          username: 'Test User',
          email: 'helloitsme@email.com',
          createdAt: '2023-02-05T23:34:42.260Z',
          updatedAt: '2024-02-05T20:11:42.260Z',
        }}
      />,
    );
    // Assert that the form elements are rendered correctly
    expect(screen.getByText('User Information')).toBeInTheDocument();

    expect(screen.getByText('Username:')).toBeInTheDocument();
    expect(screen.getByText('Test User')).toBeInTheDocument();

    expect(screen.getByText('Email:')).toBeInTheDocument();
    expect(screen.getByText('helloitsme@email.com')).toBeInTheDocument();

    expect(screen.getByText('Created:')).toBeInTheDocument();
    expect(screen.getByText('05 Feb 2023 23:34')).toBeInTheDocument();

    expect(screen.getByText('Last updated:')).toBeInTheDocument();
    expect(screen.getByText('05 Feb 2024 20:11')).toBeInTheDocument();
  });
  test('should see error message when user information is not present', () => {
    render(
      <UserModal isModalVisible={true} handleCancel={() => {}} user={null} />,
    );

    expect(screen.getByText('User Information')).toBeInTheDocument();
    expect(
      screen.getByText('Error: No user information available'),
    ).toBeInTheDocument();
  });
});
