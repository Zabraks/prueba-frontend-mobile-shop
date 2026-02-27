import { render, screen } from '@testing-library/react';
import { Card } from '@/ui/Card/Card';

describe('Card', () => {
  describe('rendering', () => {
    it('renders children', () => {
      render(<Card>Card content</Card>);
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('renders as an article element', () => {
      render(<Card>content</Card>);
      expect(screen.getByRole('article')).toBeInTheDocument();
    });

    it('applies extra className when provided', () => {
      render(<Card className="extra">content</Card>);
      expect(screen.getByRole('article')).toHaveClass('extra');
    });

    it('renders without extra className when not provided', () => {
      render(<Card>content</Card>);
      expect(screen.getByRole('article').className).not.toContain('undefined');
    });
  });
});
