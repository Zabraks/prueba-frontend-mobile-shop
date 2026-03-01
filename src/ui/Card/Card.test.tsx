import { render, screen } from '@testing-library/react';
import { Card } from '@/ui/Card/Card';

describe('Card', () => {
  describe('rendering', () => {
    it('renders children', () => {
      const cardContent = 'Card content';

      render(<Card>{cardContent}</Card>);
      const contentValue = screen.getByText(cardContent);

      expect(contentValue).toBeInTheDocument();
    });

    it('renders as an article element', () => {
      render(<Card>content</Card>);
      const article = screen.getByRole('article');

      expect(article).toBeInTheDocument();
    });

    it('applies extra className when provided', () => {
      render(<Card className="extra">content</Card>);
      const article = screen.getByRole('article');

      expect(article).toHaveClass('extra');
    });

    it('renders without extra className when not provided', () => {
      render(<Card>content</Card>);
      const articleClassName = screen.getByRole('article').className;

      expect(articleClassName).not.toContain('undefined');
    });
  });
});
