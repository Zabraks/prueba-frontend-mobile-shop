import { render, screen, fireEvent } from '@testing-library/react';
import { ColorSelector } from '@/features/phoneDetail/ColorSelector/ColorSelector';
import { mockPhoneDetail } from '@/mocks/phoneDetail.mock';

describe('ColorSelector', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => mockOnChange.mockClear());

  describe('rendering', () => {
    it('renders all color options', () => {
      render(
        <ColorSelector
          colors={mockPhoneDetail.colorOptions}
          selected={null}
          onChange={mockOnChange}
        />
      );
      expect(screen.getAllByRole('button')).toHaveLength(mockPhoneDetail.colorOptions.length);
    });

    it('does not show label when no color is selected', () => {
      render(
        <ColorSelector
          colors={mockPhoneDetail.colorOptions}
          selected={null}
          onChange={mockOnChange}
        />
      );
      expect(screen.queryByText(mockPhoneDetail.colorOptions[0].name)).not.toBeInTheDocument();
    });

    it('shows label of selected color', () => {
      render(
        <ColorSelector
          colors={mockPhoneDetail.colorOptions}
          selected={mockPhoneDetail.colorOptions[0].name}
          onChange={mockOnChange}
        />
      );
      expect(screen.getByText(mockPhoneDetail.colorOptions[0].name)).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('calls onChange with color name when clicked', () => {
      render(
        <ColorSelector
          colors={mockPhoneDetail.colorOptions}
          selected={null}
          onChange={mockOnChange}
        />
      );
      fireEvent.click(screen.getByLabelText(mockPhoneDetail.colorOptions[0].name));
      expect(mockOnChange).toHaveBeenCalledWith(mockPhoneDetail.colorOptions[0]);
    });
  });

  describe('accessibility', () => {
    it('each circle has an aria-label with the color name', () => {
      render(
        <ColorSelector
          colors={mockPhoneDetail.colorOptions}
          selected={null}
          onChange={mockOnChange}
        />
      );
      mockPhoneDetail.colorOptions.forEach((color) => {
        expect(screen.getByLabelText(color.name)).toBeInTheDocument();
      });
    });

    it('selected color has aria-pressed true', () => {
      render(
        <ColorSelector
          colors={mockPhoneDetail.colorOptions}
          selected={mockPhoneDetail.colorOptions[1].name}
          onChange={mockOnChange}
        />
      );
      expect(screen.getByLabelText(mockPhoneDetail.colorOptions[1].name)).toHaveAttribute(
        'aria-pressed',
        'true'
      );
    });
  });
});
