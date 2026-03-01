import { render, screen, fireEvent } from '@testing-library/react';
import { PhoneDetail } from '@/features/phoneDetail/PhoneDetail';
import { mockPhoneDetail } from '@/mocks/phoneDetail.mock';

describe('PhoneDetail', () => {
  describe('rendering', () => {
    it('renders the phone name', () => {
      render(<PhoneDetail data={mockPhoneDetail} />);
      expect(screen.getByText(mockPhoneDetail.name.toUpperCase())).toBeInTheDocument();
    });

    it('renders the base price initially', () => {
      render(<PhoneDetail data={mockPhoneDetail} />);
      expect(screen.getByText(`${mockPhoneDetail.basePrice} EUR`)).toBeInTheDocument();
    });

    it('renders storage options', () => {
      render(<PhoneDetail data={mockPhoneDetail} />);
      mockPhoneDetail.storageOptions.forEach((option) => {
        expect(screen.getByText(option.capacity)).toBeInTheDocument();
      });
    });

    it('renders color options', () => {
      render(<PhoneDetail data={mockPhoneDetail} />);
      mockPhoneDetail.colorOptions.forEach((color) => {
        expect(screen.getByLabelText(color.name)).toBeInTheDocument();
      });
    });

    it('has first color selected by default', () => {
      render(<PhoneDetail data={mockPhoneDetail} />);
      const firstColorOption = screen.getByLabelText(mockPhoneDetail.colorOptions[0].name);
      expect(firstColorOption).toHaveAttribute('aria-pressed', 'true');
    });
  });

  describe('add to cart button', () => {
    it('is disabled when no storage is selected', () => {
      render(<PhoneDetail data={mockPhoneDetail} />);
      expect(screen.getByRole('button', { name: /añadir/i })).toBeDisabled();
    });

    it('is enabled when storage is selected (color is selected by default)', () => {
      render(<PhoneDetail data={mockPhoneDetail} />);
      fireEvent.click(screen.getByText(mockPhoneDetail.storageOptions[0].capacity));
      expect(screen.getByRole('button', { name: /añadir/i })).toBeEnabled();
    });
  });

  describe('price update', () => {
    it('updates price when storage is selected', () => {
      render(<PhoneDetail data={mockPhoneDetail} />);
      const storageOption = mockPhoneDetail.storageOptions[0];
      fireEvent.click(screen.getByText(storageOption.capacity));
      expect(screen.getByText(`${storageOption.price} EUR`)).toBeInTheDocument();
    });
  });

  describe('color change', () => {
    it('updates displayed image when color is selected', () => {
      render(<PhoneDetail data={mockPhoneDetail} />);
      const secondColor = mockPhoneDetail.colorOptions[1];
      fireEvent.click(screen.getByLabelText(secondColor.name));

      const image = screen.getByAltText(mockPhoneDetail.name);
      expect(image).toHaveAttribute(
        'src',
        expect.stringContaining(encodeURIComponent(secondColor.imageUrl))
      );
    });
  });

  describe('specifications', () => {
    it('renders specifications section', () => {
      render(<PhoneDetail data={mockPhoneDetail} />);
      expect(screen.getByText('SPECIFICATIONS')).toBeInTheDocument();
    });

    it('renders all spec keys and values', () => {
      render(<PhoneDetail data={mockPhoneDetail} />);
      Object.entries(mockPhoneDetail.specs).forEach(([key, value]) => {
        expect(screen.getByText(key)).toBeInTheDocument();
        expect(screen.getByText(value)).toBeInTheDocument();
      });
    });
  });

  describe('similar products', () => {
    it('renders similar products section', () => {
      render(<PhoneDetail data={mockPhoneDetail} />);
      expect(screen.getByText('SIMILAR PRODUCTS')).toBeInTheDocument();
    });

    it('renders all similar products', () => {
      render(<PhoneDetail data={mockPhoneDetail} />);
      mockPhoneDetail.similarProducts.forEach((product) => {
        expect(screen.getByText(product.name.toUpperCase())).toBeInTheDocument();
      });
    });
  });
});
