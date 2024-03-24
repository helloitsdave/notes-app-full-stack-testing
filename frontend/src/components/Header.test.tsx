import { render, screen } from '@testing-library/react';
import Header  from './Header';

describe('Header', () => {
    it('renders correctly', () => {
        render(<Header />);
        expect(screen.getByTestId('app-logo')).toBeInTheDocument();
    });
});