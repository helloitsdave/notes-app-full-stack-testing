import { render, screen, waitFor } from '@testing-library/react';
import RegistrationForm, { RegistrationFormProps } from './RegistrationForm';
import userEvent from '@testing-library/user-event';

const props: RegistrationFormProps = { onRegister: () => {} };

describe('RegistrationForm', () => {
  it('should render the Registration Form', () => {
    render(<RegistrationForm {...props} />);
    expect(screen.getByText('Register new account')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
  });
  it('should show error message on failed password match', async () => {
    render(<RegistrationForm {...props} />);
    userEvent.type(screen.getByPlaceholderText('Username'), 'testerunique');
    userEvent.type(screen.getByPlaceholderText('Email'), 'test@email.com');
    userEvent.type(screen.getByPlaceholderText('Password'), 'pass');
    userEvent.type(screen.getByPlaceholderText('Confirm Password'), 'passwor');
    userEvent.click(screen.getByText('Register'));
    expect(
      await screen.findByText('Error: Passwords do not match')
    ).toBeInTheDocument();
  });
  it('should throw error message on failed registration', async () => {
    render(<RegistrationForm {...props} />);
    userEvent.type(screen.getByPlaceholderText('Username'), 'test');
    userEvent.type(screen.getByPlaceholderText('Email'), 'test@email.com');
    userEvent.type(screen.getByPlaceholderText('Password'), 'pass');
    userEvent.type(screen.getByPlaceholderText('Confirm Password'), 'pass');
    userEvent.click(screen.getByText('Register'));

    await waitFor(() => {
      expect(
        screen.getByText('Error: An error occurred. Please retry')
      ).toBeInTheDocument();
    });
  });
  it('should register new user', async () => {
    render(<RegistrationForm {...props} />);
    userEvent.type(
      screen.getByPlaceholderText('Username'),
      `test${Date.now()}`
    );
    userEvent.type(
      screen.getByPlaceholderText('Email'),
      `test${Date.now()}@email.com`
    );
    userEvent.type(screen.getByPlaceholderText('Password'), 'pass');
    userEvent.type(screen.getByPlaceholderText('Confirm Password'), 'pass');
    userEvent.click(screen.getByText('Register'));
    await waitFor(() => {
      expect(
        screen.getByText('Account created successfully!')
      ).toBeInTheDocument();
    });
  });
});
