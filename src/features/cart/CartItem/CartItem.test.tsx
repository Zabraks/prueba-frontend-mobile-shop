import { render, screen, fireEvent } from '@testing-library/react';
import { CartItem } from '@/features/cart/CartItem/CartItem';
import { CART_ITEM_STRINGS } from '@/features/cart/CartItem/constants';
import { mockCart } from '@/mocks/cart.mock';

describe('CartItem', () => {
  const mockOnRemove = vi.fn();

  const itemMocked = mockCart[0];

  beforeEach(() => mockOnRemove.mockClear());

  describe('rendering', () => {
    it('renders the phone name', () => {
      render(<CartItem item={itemMocked} onRemove={mockOnRemove} />);

      const name = screen.getByText(itemMocked.name);

      expect(name).toBeInTheDocument();
    });

    it('renders selected storage and color', () => {
      render(<CartItem item={itemMocked} onRemove={mockOnRemove} />);

      const storage = screen.getByText(new RegExp(itemMocked.selectedStorage));
      const color = screen.getByText(new RegExp(itemMocked.selectedColor));

      expect(storage).toBeInTheDocument();
      expect(color).toBeInTheDocument();
    });

    it('renders the price', () => {
      render(<CartItem item={itemMocked} onRemove={mockOnRemove} />);

      const price = screen.getByText(`${itemMocked.price} ${CART_ITEM_STRINGS.currency}`);

      expect(price).toBeInTheDocument();
    });

    it('renders the phone image', () => {
      render(<CartItem item={itemMocked} onRemove={mockOnRemove} />);

      const imageAltText = screen.getByAltText(itemMocked.name);

      expect(imageAltText).toBeInTheDocument();
    });

    it('renders the remove button', () => {
      render(<CartItem item={itemMocked} onRemove={mockOnRemove} />);

      const removeButton = screen.getByRole('button', {
        name: CART_ITEM_STRINGS.removeAriaLabel(itemMocked.name),
      });

      expect(removeButton).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('calls onRemove with phone id when remove is clicked', () => {
      render(<CartItem item={itemMocked} onRemove={mockOnRemove} />);

      const removeButton = screen.getByRole('button', {
        name: CART_ITEM_STRINGS.removeAriaLabel(itemMocked.name),
      });

      fireEvent.click(removeButton);
      expect(mockOnRemove).toHaveBeenCalledWith(itemMocked.id);
    });
  });

  describe('accessibility', () => {
    it('has an article with aria-label', () => {
      render(<CartItem item={itemMocked} onRemove={mockOnRemove} />);

      const article = screen.getByRole('article', { name: itemMocked.name });

      expect(article).toBeInTheDocument();
    });
  });
});
