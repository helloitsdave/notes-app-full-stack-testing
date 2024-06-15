import { render, screen } from '@testing-library/react';
import RegistrationLink from './RegistrationLink';

describe('RegistrationLink', () => {
  it('should render the registration link', () => {
    render(<RegistrationLink onRegister={false} />);
    expect(
      screen.getByText(
        'This is a simple app to demonstrate different automated testing techniques.',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Sign up for your free e-notes account.'),
    ).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();

    expect(
      screen.getByText('View the source code on GitHub.'),
    ).toBeInTheDocument();

    expect(screen.getByAltText('Github link')).toBeInTheDocument();
  });

  it('should render the registration link with account created successfully message', () => {
    render(<RegistrationLink onRegister={true} />);
    expect(
      screen.getByText('Account created successfully!'),
    ).toBeInTheDocument();
    expect(screen.getByText('Please log in')).toBeInTheDocument();
  });
});
