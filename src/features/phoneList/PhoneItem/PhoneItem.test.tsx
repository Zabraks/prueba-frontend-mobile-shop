import { render, screen } from '@testing-library/react';
import { PhoneItem } from '@/features/phoneList/PhoneItem/PhoneItem';
import { ROUTES } from '@/config/routes';
import { PHONE_CARD_STRINGS } from '@/features/phoneList/PhoneItem/constants';
import { APP_CONFIG } from '@/config/app';
import { mockPhoneItem } from '@/mocks/phoneItem.mock';

describe('PhoneItem', () => {
  describe('rendering', () => {
    it('renders the phone brand in uppercase', () => {
      render(<PhoneItem phone={mockPhoneItem} />);

      const brand = screen.getByText(mockPhoneItem.brand);

      expect(brand).toBeInTheDocument();
    });

    it('renders the phone name in uppercase', () => {
      render(<PhoneItem phone={mockPhoneItem} />);

      const name = screen.getByText(mockPhoneItem.name);

      expect(name).toBeInTheDocument();
    });

    it('renders the phone price with currency', () => {
      render(<PhoneItem phone={mockPhoneItem} />);

      const price = screen.getByText(`${mockPhoneItem.basePrice} ${APP_CONFIG.currency}`);

      expect(price).toBeInTheDocument();
    });

    it('renders the phone image with correct alt text', () => {
      render(<PhoneItem phone={mockPhoneItem} />);

      const image = screen.getByAltText(
        PHONE_CARD_STRINGS.imageAlt(mockPhoneItem.brand, mockPhoneItem.name)
      );

      expect(image).toBeInTheDocument();
    });
  });

  describe('navigation', () => {
    it('links to the phone detail page', () => {
      render(<PhoneItem phone={mockPhoneItem} />);
      expect(
        screen.getByRole('link', {
          name: PHONE_CARD_STRINGS.ariaLabel(mockPhoneItem.brand, mockPhoneItem.name),
        })
      ).toHaveAttribute('href', ROUTES.phoneDetail(mockPhoneItem.id));
    });
  });

  describe('accessibility', () => {
    it('has a descriptive aria-label', () => {
      render(<PhoneItem phone={mockPhoneItem} />);
      expect(
        screen.getByLabelText(PHONE_CARD_STRINGS.ariaLabel(mockPhoneItem.brand, mockPhoneItem.name))
      ).toBeInTheDocument();
    });

    it('the image has a meaningful alt text', () => {
      render(<PhoneItem phone={mockPhoneItem} />);
      const image = screen.getByAltText(
        PHONE_CARD_STRINGS.imageAlt(mockPhoneItem.brand, mockPhoneItem.name)
      );
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('alt');
    });
  });
});
