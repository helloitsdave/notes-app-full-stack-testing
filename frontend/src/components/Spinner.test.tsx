import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner', () => {
    it('renders correctly', () => {
        render(<Spinner />);
        expect(screen.getByTestId('spinner-container')).toBeInTheDocument();
    });
});