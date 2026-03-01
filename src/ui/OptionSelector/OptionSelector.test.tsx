import { render, screen, fireEvent } from '@testing-library/react';
import { OptionSelector } from '@/ui/OptionSelector/OptionSelector';
import { mockOptions } from '@/mocks/mockOptions';

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
      expect(screen.getAllByRole('button')).toHaveLength(3);
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
      expect(screen.getByText(selectedOption.label)).toHaveAttribute('aria-pressed', 'true');
      expect(screen.getByText(notSelectedOption.label)).toHaveAttribute('aria-pressed', 'false');
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
      expect(screen.getByRole('group', { name: ariaLabel })).toBeInTheDocument();
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
      fireEvent.click(screen.getByText(selectedOption.label));
      expect(mockOnChange).toHaveBeenCalledWith(selectedOption);
    });
  });
});