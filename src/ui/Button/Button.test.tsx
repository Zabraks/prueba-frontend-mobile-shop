import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/ui/Button/Button';
import styles from './Button.module.scss';

describe('Button', () => {
  describe('rendering', () => {
    it('renders children', () => {
      render(<Button>Button</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders with primary variant by default', () => {
      render(<Button>Add to cart</Button>);
      expect(screen.getByRole('button')).toHaveClass(styles.primary);
    });

    it('renders with ghost variant when specified', () => {
      render(<Button variant="ghost">Back</Button>);
      expect(screen.getByRole('button')).toHaveClass(styles.ghost);
    });

    it('renders full width when fullWidth is true', () => {
      render(<Button fullWidth>full width</Button>);
      expect(screen.getByRole('button')).toHaveClass(styles.fullWidth);
    });
  });

  describe('interactions', () => {
    it('calls onClick when clicked', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Action</Button>);
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', () => {
      const handleClick = vi.fn();
      render(
        <Button disabled onClick={handleClick}>
          Add to cart
        </Button>
      );
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('is disabled when disabled prop is true', () => {
      render(<Button disabled>Add to cart</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('applies aria-label when provided', () => {
      render(<Button aria-label="Add phone to cart">Add</Button>);
      expect(screen.getByLabelText('Add phone to cart')).toBeInTheDocument();
    });
  });
});