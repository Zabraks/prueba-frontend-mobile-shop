import { render, screen } from '@testing-library/react';
import NotFound from '@/app/not-found';
import { NOT_FOUND_STRINGS } from './constants';
import { ROUTES } from '@/config/routes';

describe('NotFound', () => {
  describe('rendering', () => {
    it('renders the 404 code', () => {
      render(<NotFound />);
      expect(screen.getByText(NOT_FOUND_STRINGS.errorCode)).toBeInTheDocument();
    });

    it('renders the not found message', () => {
      render(<NotFound />);
      const message = screen.getByText(NOT_FOUND_STRINGS.message);

      expect(message).toBeInTheDocument();
    });

    it('renders the go to phones button', () => {
      render(<NotFound />);
      const button = screen.getByRole('button', { name: NOT_FOUND_STRINGS.action });

      expect(button).toBeInTheDocument();
    });

    it('go to phones links to /phones', () => {
      render(<NotFound />);
      const link = screen.getByRole('link');

      expect(link).toHaveAttribute('href', ROUTES.phones);
    });
  });
});
