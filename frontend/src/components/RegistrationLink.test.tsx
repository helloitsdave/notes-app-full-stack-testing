import { render, screen } from '@testing-library/react';
import RegistrationLink from './RegistrationLink';

describe('RegistrationLink', () => {
  it('should render the registration link', () => {
    render(<RegistrationLink onRegister={false} />);
    expect(screen.getByText('Welcome to the e-notes app')).toBeInTheDocument();
    expect(
      screen.getByText('Sign up for your free account'),
    ).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });

  it('should render the registration link with account created successfully message', () => {
    render(<RegistrationLink onRegister={true} />);
    expect(
      screen.getByText('Account created successfully!'),
    ).toBeInTheDocument();
    expect(screen.getByText('Please log in')).toBeInTheDocument();
  });
});
