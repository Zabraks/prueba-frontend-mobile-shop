import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from '@/features/phoneList/SearchBar/SearchBar';
import { SEARCH_BAR_STRINGS } from '@/features/phoneList/SearchBar/constants';

describe('SearchBar', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  describe('rendering', () => {
    it('renders the search input', () => {
      render(<SearchBar value="" onChange={mockOnChange} resultsCount={20} />);
      const placeholderText = screen.getByPlaceholderText(SEARCH_BAR_STRINGS.placeholder);

      expect(placeholderText).toBeInTheDocument();
    });

    it('displays the results count', () => {
      render(<SearchBar value="" onChange={mockOnChange} resultsCount={20} />);
      const resultsText = screen.getByText(SEARCH_BAR_STRINGS.results(20));

      expect(resultsText).toBeInTheDocument();
    });

    it('does not show clear button when input is empty', () => {
      render(<SearchBar value="" onChange={mockOnChange} resultsCount={20} />);
      const clearButton = screen.queryByLabelText(SEARCH_BAR_STRINGS.clearAriaLabel);

      expect(clearButton).not.toBeInTheDocument();
    });

    it('shows clear button when input has value', () => {
      render(<SearchBar value="Samsung" onChange={mockOnChange} resultsCount={5} />);
      const clearButton = screen.queryByLabelText(SEARCH_BAR_STRINGS.clearAriaLabel);

      expect(clearButton).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('calls onChange when typing', () => {
      render(<SearchBar value="" onChange={mockOnChange} resultsCount={20} />);
      const input = screen.getByRole('searchbox');

      fireEvent.change(input, { target: { value: 'Apple' } });

      expect(mockOnChange).toHaveBeenCalledWith('Apple');
    });

    it('calls onChange with empty string when clear is clicked', () => {
      render(<SearchBar value="Samsung" onChange={mockOnChange} resultsCount={5} />);
      const clearButton = screen.getByLabelText(SEARCH_BAR_STRINGS.clearAriaLabel);

      fireEvent.click(clearButton);
      expect(mockOnChange).toHaveBeenCalledWith('');
    });
  });

  describe('accessibility', () => {
    it('has aria-live on results container', () => {
      render(<SearchBar value="" onChange={mockOnChange} resultsCount={20} />);
      const meta = screen.getByText(SEARCH_BAR_STRINGS.results(20)).closest('div');

      expect(meta).toHaveAttribute('aria-live', 'polite');
      expect(meta).toHaveAttribute('aria-atomic', 'true');
    });

    it('input has aria-label', () => {
      render(<SearchBar value="" onChange={mockOnChange} resultsCount={20} />);
      const ariaLabel = screen.getByLabelText(SEARCH_BAR_STRINGS.inputAriaLabel);

      expect(ariaLabel).toBeInTheDocument();
    });
  });
});
