import { render, screen } from '@testing-library/react';
import { Grid } from '@/ui/Grid/Grid';

const mockItems = [
  { id: '1', label: 'Item One' },
  { id: '2', label: 'Item Two' },
  { id: '3', label: 'Item Three' },
];

const renderMockComponent = (ariaLabel = 'Test grid') =>
  render(
    <Grid
      items={mockItems}
      keyExtractor={(item) => item.id}
      ariaLabel={ariaLabel}
      renderItem={(item) => <span>{item.label}</span>}
    />
  );

describe('Grid', () => {
  describe('rendering', () => {
    it('renders as a list element', () => {
      renderMockComponent();
      const grid = screen.getByRole('list');

      expect(grid).toBeInTheDocument();
    });

    it('renders all items', () => {
      renderMockComponent();
      const itemsGrid = screen.getAllByRole('listitem');

      expect(itemsGrid).toHaveLength(3);
    });

    it('renders the content of each item', () => {
      renderMockComponent();

      mockItems.forEach((item) => {
        const itemGrid = screen.getByText(item.label);
        expect(itemGrid).toBeInTheDocument();
      });
    });

    it('renders an empty list when items array is empty', () => {
      render(
        <Grid
          items={[]}
          keyExtractor={(item: { id: string }) => item.id}
          ariaLabel="Test grid"
          renderItem={() => <span>item</span>}
        />
      );

      const items = screen.queryAllByRole('listitem');

      expect(items).toHaveLength(0);
    });
  });

  describe('accessibility', () => {
    it('applies the ariaLabel to the list', () => {
      const name = 'Phone list';

      renderMockComponent(name);

      const grid = screen.getByRole('list', { name: name });

      expect(grid).toBeInTheDocument();
    });
  });
});
