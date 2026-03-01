import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from './Navbar';
import { ROUTES } from '@/lib/routes';
import { NAVBAR_STRINGS } from '@/features/layout/Navbar/constants';
import { CartProvider } from '@/context/CartContext/CartContext';
import { mockCart } from '@/mocks/cart.mock';

const createWrapper = () => {
  const queryClient = new QueryClient();
  const TestWrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <CartProvider>{children}</CartProvider>
    </QueryClientProvider>
  );
  return TestWrapper;
};

const renderWithProviders = (ui: React.ReactElement) => render(ui, { wrapper: createWrapper() });

describe('Navbar', () => {
  describe('rendering', () => {
    it('renders the logo', () => {
      renderWithProviders(<Navbar />);

      const logo = screen.getByLabelText(NAVBAR_STRINGS.logoAriaLabel);

      expect(logo).toBeInTheDocument();
    });

    it('renders the cart icon', () => {
      renderWithProviders(<Navbar />);

      const cartIcon = screen.getByLabelText(NAVBAR_STRINGS.cartAriaLabel(0));

      expect(cartIcon).toBeInTheDocument();
    });

    it('displays 0 when the cart is empty', () => {
      renderWithProviders(<Navbar />);

      const cartNumber = screen.getByText('0');

      expect(cartNumber).toBeInTheDocument();
    });
  });

  describe('navigation', () => {
    it('the logo links to /phones', () => {
      renderWithProviders(<Navbar />);

      const logoLink = screen.getByLabelText(NAVBAR_STRINGS.logoAriaLabel);

      expect(logoLink).toHaveAttribute('href', ROUTES.phones);
    });

    it('the cart links to /cart', () => {
      renderWithProviders(<Navbar />);

      const cartLink = screen.getByLabelText(NAVBAR_STRINGS.cartAriaLabel(0));

      expect(cartLink).toHaveAttribute('href', ROUTES.cart);
    });
  });

  describe('accessibility', () => {
    it('the cart aria-label reflects the item count', () => {
      localStorage.setItem('cart', JSON.stringify(mockCart));
      renderWithProviders(<Navbar />);

      const cartIcon = screen.getByLabelText(NAVBAR_STRINGS.cartAriaLabel(mockCart.length));

      expect(cartIcon).toBeInTheDocument();
    });

    it('has a nav element with aria-label', () => {
      renderWithProviders(<Navbar />);

      const nav = screen.getByRole('navigation', { name: NAVBAR_STRINGS.mainNavigationLabel });

      expect(nav).toBeInTheDocument();
    });
  });
});
