import { render, screen } from '@testing-library/react';
import { Navbar } from './Navbar';
import { ROUTES } from '@/lib/routes';
import { NAVBAR_STRINGS } from '@/features/layout/Navbar/constants';

describe('Navbar', () => {
  describe('rendering', () => {
    it('renders the logo', () => {
      render(<Navbar />);
      expect(screen.getByLabelText(NAVBAR_STRINGS.logoAriaLabel)).toBeInTheDocument();
    });

    it('renders the cart icon', () => {
      render(<Navbar />);
      expect(screen.getByLabelText(NAVBAR_STRINGS.cartAriaLabel(0))).toBeInTheDocument();
    });

    //TODO: mover tests cuando hagamos la lógica del carrito
    it('displays 0 when the cart is empty', () => {
      render(<Navbar />);
      expect(screen.getByText('0')).toBeInTheDocument();
    });
  });

  describe('navigation', () => {
    it('the logo links to /phones', () => {
      render(<Navbar />);
      expect(screen.getByLabelText(NAVBAR_STRINGS.logoAriaLabel)).toHaveAttribute(
        'href',
        ROUTES.phones
      );
    });

    it('the cart links to /cart', () => {
      render(<Navbar />);
      expect(screen.getByLabelText(NAVBAR_STRINGS.cartAriaLabel(0))).toHaveAttribute(
        'href',
        ROUTES.cart
      );
    });
  });

  describe('accessibility', () => {
    it('the cart aria-label reflects the item count', () => {
      render(<Navbar />);
      //TODO: adaptar cuando hagamos el carrito
      expect(screen.getByLabelText(NAVBAR_STRINGS.cartAriaLabel(0))).toBeInTheDocument();
    });

    it('has a nav element with aria-label', () => {
      render(<Navbar />);
      const nav = screen.getByRole('navigation', { name: NAVBAR_STRINGS.mainNavigationLabel });
      expect(nav).toBeInTheDocument();
    });
  });
});
