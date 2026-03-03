import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorView } from '@/features/layout/errorView/ErrorView';
import { ERROR_VIEW_STRINGS } from '@/features/layout/errorView/constants';

describe('ErrorView', () => {
  describe('rendering', () => {
    it('renders the message for phones section', () => {
      render(<ErrorView section="phones" actions={[{ action: 'tryAgain', onClick: vi.fn() }]} />);

      const message = screen.getByText(ERROR_VIEW_STRINGS.phones.message);

      expect(message).toBeInTheDocument();
    });

    it('renders the message for phoneDetail section', () => {
      render(
        <ErrorView section="phoneDetail" actions={[{ action: 'tryAgain', onClick: vi.fn() }]} />
      );

      const message = screen.getByText(ERROR_VIEW_STRINGS.phoneDetail.message);

      expect(message).toBeInTheDocument();
    });

    it('renders the message for cart section', () => {
      render(<ErrorView section="cart" actions={[{ action: 'tryAgain', onClick: vi.fn() }]} />);
      const message = screen.getByText(ERROR_VIEW_STRINGS.cart.message);

      expect(message).toBeInTheDocument();
    });

    it('renders a button action', () => {
      render(<ErrorView section="phones" actions={[{ action: 'tryAgain', onClick: vi.fn() }]} />);

      const button = screen.getByRole('button', { name: ERROR_VIEW_STRINGS.action.tryAgain });

      expect(button).toBeInTheDocument();
    });

    it('renders a link action', () => {
      render(
        <ErrorView
          section="phoneDetail"
          actions={[
            { action: 'tryAgain', onClick: vi.fn() },
            { action: 'goBack', href: '/phones' },
          ]}
        />
      );

      const link = screen.getByRole('link', { name: ERROR_VIEW_STRINGS.action.goBack });

      expect(link).toHaveAttribute('href', '/phones');
    });

    it('renders multiple actions', () => {
      render(
        <ErrorView
          section="phoneDetail"
          actions={[
            { action: 'tryAgain', onClick: vi.fn() },
            { action: 'goBack', href: '/phones' },
          ]}
        />
      );

      const button = screen.getByRole('button', { name: ERROR_VIEW_STRINGS.action.tryAgain });
      const link = screen.getByRole('link', { name: ERROR_VIEW_STRINGS.action.goBack });

      expect(button).toBeInTheDocument();
      expect(link).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('calls onClick when button action is clicked', () => {
      const mockOnClick = vi.fn();

      render(
        <ErrorView section="phones" actions={[{ action: 'tryAgain', onClick: mockOnClick }]} />
      );

      const button = screen.getByRole('button', { name: ERROR_VIEW_STRINGS.action.tryAgain });

      fireEvent.click(button);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });
});
