import { render, screen } from '@testing-library/react';
import { CartFooter } from '@/features/cart/CartFooter/CartFooter';
import { CART_FOOTER_STRINGS } from '@/features/cart/CartFooter/constants';
import { ROUTES } from '@/config/routes';
import { APP_CONFIG } from '@/config/app';

describe('CartFooter', () => {
  const mockOnPay = vi.fn();
  describe('rendering', () => {
    it('always renders the continue shopping button', () => {
      render(<CartFooter totalPrice={0} hasItems={false} onPay={mockOnPay} />);
      expect(
        screen.getByRole('button', { name: CART_FOOTER_STRINGS.continueShopping })
      ).toBeInTheDocument();
    });

    it('continue shopping links to /phones', () => {
      render(<CartFooter totalPrice={0} hasItems={false} onPay={mockOnPay} />);

      const continueShoppingButton = screen.getByRole('link');

      expect(continueShoppingButton).toHaveAttribute('href', ROUTES.phones);
    });

    it('shows total price and pay button when cart has items', () => {
      const totalValue = 1199;

      render(<CartFooter totalPrice={totalValue} hasItems={true} onPay={mockOnPay} />);

      const totalPrice = screen.getByText(`${totalValue} ${APP_CONFIG.currency}`);
      const payButton = screen.getByRole('button', { name: CART_FOOTER_STRINGS.pay });

      expect(totalPrice).toBeInTheDocument();
      expect(payButton).toBeInTheDocument();
    });

    it('does not show total price or pay button when cart is empty', () => {
      render(<CartFooter totalPrice={0} hasItems={false} onPay={mockOnPay} />);

      const payButton = screen.queryByText(CART_FOOTER_STRINGS.pay);
      const totalPrice = screen.queryByText(CART_FOOTER_STRINGS.total);

      expect(payButton).not.toBeInTheDocument();
      expect(totalPrice).not.toBeInTheDocument();
    });
  });
});
