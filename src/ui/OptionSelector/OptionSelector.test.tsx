import { render, screen, fireEvent } from '@testing-library/react';
import { OptionSelector } from '@/ui/OptionSelector/OptionSelector';
import { mockOptions } from '@/mocks/mockOptions.mock';

const ariaLabel = 'Select option';

describe('OptionSelector', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => mockOnChange.mockClear());

  describe('rendering', () => {
    it('renders all options', () => {
      render(
        <OptionSelector
          options={mockOptions}
          selected={null}
          onChange={mockOnChange}
          ariaLabel={ariaLabel}
        />
      );

      const buttons = screen.getAllByRole('button');

      expect(buttons).toHaveLength(3);
    });

    it('marks selected option with aria-pressed', () => {
      const selectedOption = mockOptions[1];
      const notSelectedOption = mockOptions[0];

      render(
        <OptionSelector
          options={mockOptions}
          selected={selectedOption.value}
          onChange={mockOnChange}
          ariaLabel={ariaLabel}
        />
      );

      const selectedButton = screen.getByText(selectedOption.label);
      const notSelectedButton = screen.getByText(notSelectedOption.label);

      expect(selectedButton).toHaveAttribute('aria-pressed', 'true');
      expect(notSelectedButton).toHaveAttribute('aria-pressed', 'false');
    });

    it('applies group role with aria-label', () => {
      render(
        <OptionSelector
          options={mockOptions}
          selected={null}
          onChange={mockOnChange}
          ariaLabel={ariaLabel}
        />
      );

      const group = screen.getByRole('group', { name: ariaLabel });

      expect(group).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('calls onChange with the selected value', () => {
      const selectedOption = mockOptions[2];

      render(
        <OptionSelector
          options={mockOptions}
          selected={null}
          onChange={mockOnChange}
          ariaLabel={ariaLabel}
        />
      );

      const option = screen.getByText(selectedOption.label);
      fireEvent.click(option);

      expect(mockOnChange).toHaveBeenCalledWith(selectedOption);
    });
  });
});
