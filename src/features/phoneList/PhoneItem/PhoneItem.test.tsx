import { render, screen } from '@testing-library/react';
import { PhoneItem } from '@/features/phoneList/PhoneItem/PhoneItem';
import { ROUTES } from '@/lib/routes';
import { PHONE_CARD_STRINGS } from '@/features/phoneList/PhoneItem/constants';

const mockPhone = {
  id: 'MTO-G24',
  brand: 'Motorola',
  name: 'g24',
  basePrice: 119,
  imageUrl: 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/MTO-G24-gris.webp',
};

describe('PhoneItem', () => {
  describe('rendering', () => {
    it('renders the phone brand in uppercase', () => {
      render(<PhoneItem phone={mockPhone} />);

      const brand = screen.getByText(mockPhone.brand);

      expect(brand).toBeInTheDocument();
    });

    it('renders the phone name in uppercase', () => {
      render(<PhoneItem phone={mockPhone} />);

      const name = screen.getByText(mockPhone.name);

      expect(name).toBeInTheDocument();
    });

    it('renders the phone price with currency', () => {
      render(<PhoneItem phone={mockPhone} />);

      const price = screen.getByText(`${mockPhone.basePrice} ${PHONE_CARD_STRINGS.currency}`);

      expect(price).toBeInTheDocument();
    });

    it('renders the phone image with correct alt text', () => {
      render(<PhoneItem phone={mockPhone} />);

      const image = screen.getByAltText(
        PHONE_CARD_STRINGS.imageAlt(mockPhone.brand, mockPhone.name)
      );

      expect(image).toBeInTheDocument();
    });
  });

  describe('navigation', () => {
    it('links to the phone detail page', () => {
      render(<PhoneItem phone={mockPhone} />);
      expect(
        screen.getByRole('link', {
          name: PHONE_CARD_STRINGS.ariaLabel(mockPhone.brand, mockPhone.name),
        })
      ).toHaveAttribute('href', ROUTES.phoneDetail(mockPhone.id));
    });
  });

  describe('accessibility', () => {
    it('has a descriptive aria-label', () => {
      render(<PhoneItem phone={mockPhone} />);
      expect(
        screen.getByLabelText(PHONE_CARD_STRINGS.ariaLabel(mockPhone.brand, mockPhone.name))
      ).toBeInTheDocument();
    });

    it('the image has a meaningful alt text', () => {
      render(<PhoneItem phone={mockPhone} />);
      const image = screen.getByAltText(
        PHONE_CARD_STRINGS.imageAlt(mockPhone.brand, mockPhone.name)
      );
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('alt');
    });
  });
});
