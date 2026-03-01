import { render, screen, fireEvent } from '@testing-library/react';
import { Cart } from '@/features/cart/Cart';
import { CartProvider } from '@/context/CartContext/CartContext';
import { CART_STRINGS } from '@/features/cart/constants';
import { CART_ITEM_STRINGS } from '@/features/cart/CartItem/constants';
import { mockCart } from '@/mocks/cart.mock';

const renderCart = () =>
  render(
    <CartProvider>
      <Cart />
    </CartProvider>
  );

describe('Cart', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('empty cart', () => {
    it('renders the cart title with 0 items', () => {
      renderCart();

      const title = screen.getByText(CART_STRINGS.title(0));

      expect(title).toBeInTheDocument();
    });

    it('does not render any cart items', () => {
      renderCart();

      const article = screen.queryAllByRole('article');

      expect(article).toHaveLength(0);
    });

    it('does not show the pay button', () => {
      renderCart();

      const payButton = screen.queryByText('PAY');

      expect(payButton).not.toBeInTheDocument();
    });
  });

  describe('with items', () => {
    beforeEach(() => {
      localStorage.setItem('cart', JSON.stringify(mockCart));
    });

    it('renders the cart title with item count', () => {
      renderCart();

      const title = screen.getByText(CART_STRINGS.title(mockCart.length));

      expect(title).toBeInTheDocument();
    });

    it('renders all cart items', () => {
      renderCart();

      const articles = screen.getAllByRole('article');

      expect(articles).toHaveLength(mockCart.length);
    });

    it('renders the total price', () => {
      renderCart();
      const expectedTotal = mockCart.reduce((acc, item) => acc + item.price, 0);
      const totalPrice = screen.getByText(new RegExp(String(expectedTotal)));

      expect(totalPrice).toBeInTheDocument();
    });

    it('removes item when remove is clicked', () => {
      renderCart();
      const removeButton = screen.getByRole('button', {
        name: CART_ITEM_STRINGS.removeAriaLabel(mockCart[0].name),
      });

      fireEvent.click(removeButton);

      const title = screen.getByText(CART_STRINGS.title(mockCart.length - 1));

      expect(title).toBeInTheDocument();
    });
  });
});
