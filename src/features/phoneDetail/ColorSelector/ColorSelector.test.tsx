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

      const colorButtons = screen.getAllByRole('button');

      expect(colorButtons).toHaveLength(mockPhoneDetail.colorOptions.length);
    });

    it('does not show label when no color is selected', () => {
      render(
        <ColorSelector
          colors={mockPhoneDetail.colorOptions}
          selected={null}
          onChange={mockOnChange}
        />
      );

      const colorLabels = screen.queryByText(mockPhoneDetail.colorOptions[0].name);

      expect(colorLabels).not.toBeInTheDocument();
    });

    it('shows label of selected color', () => {
      render(
        <ColorSelector
          colors={mockPhoneDetail.colorOptions}
          selected={mockPhoneDetail.colorOptions[0].name}
          onChange={mockOnChange}
        />
      );

      const selectedColor = screen.getByText(mockPhoneDetail.colorOptions[0].name);

      expect(selectedColor).toBeInTheDocument();
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

      const firstColorOption = screen.getByLabelText(mockPhoneDetail.colorOptions[0].name);

      fireEvent.click(firstColorOption);

      expect(mockOnChange).toHaveBeenCalledWith(mockPhoneDetail.colorOptions[0]);
    });
  });

  describe('accessibility', () => {
    it('each selector has an aria-label with the color name', () => {
      render(
        <ColorSelector
          colors={mockPhoneDetail.colorOptions}
          selected={null}
          onChange={mockOnChange}
        />
      );

      mockPhoneDetail.colorOptions.forEach((color) => {
        const colorButton = screen.getByLabelText(color.name);

        expect(colorButton).toBeInTheDocument();
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

      const selectedColorButton = screen.getByLabelText(mockPhoneDetail.colorOptions[1].name);

      expect(selectedColorButton).toHaveAttribute('aria-pressed', 'true');
    });
  });
});
