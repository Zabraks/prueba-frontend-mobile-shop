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
      expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('renders all items', () => {
      renderMockComponent();
      expect(screen.getAllByRole('listitem')).toHaveLength(3);
    });

    it('renders the content of each item', () => {
      renderMockComponent();
      expect(screen.getByText('Item One')).toBeInTheDocument();
      expect(screen.getByText('Item Two')).toBeInTheDocument();
      expect(screen.getByText('Item Three')).toBeInTheDocument();
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
      expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    });
  });

  describe('accessibility', () => {
    it('applies the ariaLabel to the list', () => {
      renderMockComponent('Phone list');
      expect(screen.getByRole('list', { name: 'Phone list' })).toBeInTheDocument();
    });
  });
});
