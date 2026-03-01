import { render, screen, fireEvent } from '@testing-library/react';
import { PhoneDetail } from '@/features/phoneDetail/PhoneDetail';
import { PHONE_DETAIL_STRINGS } from '@/features/phoneDetail/constants';
import { mockPhoneDetail } from '@/mocks/phoneDetail.mock';
import { CartProvider } from '@/context/CartContext/CartContext';

const renderWithCart = (ui: React.ReactElement) => render(<CartProvider>{ui}</CartProvider>);

describe('PhoneDetail', () => {
  describe('rendering', () => {
    it('renders the phone name', () => {
      renderWithCart(<PhoneDetail data={mockPhoneDetail} />);

      const name = screen.getByText(mockPhoneDetail.name.toUpperCase());

      expect(name).toBeInTheDocument();
    });

    it('renders the base price initially', () => {
      renderWithCart(<PhoneDetail data={mockPhoneDetail} />);

      const price = screen.getByText(`${mockPhoneDetail.basePrice} EUR`);

      expect(price).toBeInTheDocument();
    });

    it('renders storage options', () => {
      renderWithCart(<PhoneDetail data={mockPhoneDetail} />);
      mockPhoneDetail.storageOptions.forEach((option) => {
        const storageOption = screen.getByText(option.capacity);

        expect(storageOption).toBeInTheDocument();
      });
    });

    it('renders color options', () => {
      renderWithCart(<PhoneDetail data={mockPhoneDetail} />);
      mockPhoneDetail.colorOptions.forEach((color) => {
        const colorOption = screen.getByLabelText(color.name);

        expect(colorOption).toBeInTheDocument();
      });
    });

    it('has first color selected by default', () => {
      renderWithCart(<PhoneDetail data={mockPhoneDetail} />);
      const firstColorOption = screen.getByLabelText(mockPhoneDetail.colorOptions[0].name);
      expect(firstColorOption).toHaveAttribute('aria-pressed', 'true');
    });
  });

  describe('add to cart button', () => {
    it('is disabled when no storage is selected', () => {
      renderWithCart(<PhoneDetail data={mockPhoneDetail} />);

      const addToCartButton = screen.getByRole('button', {
        name: PHONE_DETAIL_STRINGS.addToCartDisabled,
      });

      expect(addToCartButton).toBeDisabled();
    });

    it('is enabled when storage is selected (color is selected by default)', () => {
      renderWithCart(<PhoneDetail data={mockPhoneDetail} />);

      const storageOption = screen.getByText(mockPhoneDetail.storageOptions[0].capacity);

      fireEvent.click(storageOption);

      const addToCartButton = screen.getByRole('button', {
        name: PHONE_DETAIL_STRINGS.addToCart(mockPhoneDetail.name),
      });
      expect(addToCartButton).toBeEnabled();
    });
  });

  describe('price update', () => {
    it('updates price when storage is selected', () => {
      renderWithCart(<PhoneDetail data={mockPhoneDetail} />);

      const storageOption = screen.getByText(mockPhoneDetail.storageOptions[0].capacity);
      fireEvent.click(storageOption);

      const price = screen.getByText(
        `${mockPhoneDetail.storageOptions[0].price} ${PHONE_DETAIL_STRINGS.currency}`
      );

      expect(price).toBeInTheDocument();
    });
  });

  describe('color change', () => {
    it('updates displayed image when color is selected', () => {
      renderWithCart(<PhoneDetail data={mockPhoneDetail} />);
      const secondColor = screen.getByLabelText(mockPhoneDetail.colorOptions[1].name);
      fireEvent.click(secondColor);

      const image = screen.getByAltText(mockPhoneDetail.name);
      expect(image).toHaveAttribute(
        'src',
        expect.stringContaining(encodeURIComponent(mockPhoneDetail.colorOptions[1].imageUrl))
      );
    });
  });

  describe('specifications', () => {
    it('renders specifications section', () => {
      renderWithCart(<PhoneDetail data={mockPhoneDetail} />);

      const specsTitle = screen.getByText('SPECIFICATIONS');

      expect(specsTitle).toBeInTheDocument();
    });

    it('renders all spec keys and values', () => {
      renderWithCart(<PhoneDetail data={mockPhoneDetail} />);
      Object.entries(mockPhoneDetail.specs).forEach(([key, value]) => {
        const specsKey = screen.getByText(key);
        const specsValue = screen.getByText(value);

        expect(specsKey).toBeInTheDocument();
        expect(specsValue).toBeInTheDocument();
      });
    });
  });

  describe('similar products', () => {
    it('renders similar products section', () => {
      renderWithCart(<PhoneDetail data={mockPhoneDetail} />);

      const similarProductsTitle = screen.getByText('SIMILAR PRODUCTS');

      expect(similarProductsTitle).toBeInTheDocument();
    });

    it('renders all similar products', () => {
      renderWithCart(<PhoneDetail data={mockPhoneDetail} />);
      mockPhoneDetail.similarProducts.forEach((product) => {
        const productName = screen.getByText(product.name.toUpperCase());

        expect(productName).toBeInTheDocument();
      });
    });
  });
});
