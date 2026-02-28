import { render, screen, fireEvent } from '@testing-library/react';
import { PhoneList } from '@/features/phoneList/PhoneList/PhoneList';
import { PHONE_LIST_STRINGS } from '@/features/phoneList/PhoneList/constants';
import { SEARCH_BAR_STRINGS } from '@/features/phoneList/SearchBar/constants';
import { mockPhoneList } from '@/mocks/phonelist.mock';

vi.mock('@/hooks/usePhoneList', () => ({
  usePhoneList: vi.fn(),
}));

vi.mock('@/hooks/useDebounce', () => ({
  useDebounce: vi.fn((value: string) => (value.length >= 3 ? value : '')),
}));

import { usePhoneList } from '@/hooks/usePhoneList';

const mockUsePhoneList = vi.mocked(usePhoneList);

const filterPhones = (query: string) =>
  mockPhoneList.filter(
    (p) =>
      p.brand.toLowerCase().includes(query.toLowerCase()) ||
      p.name.toLowerCase().includes(query.toLowerCase())
  );

describe('PhoneList', () => {
  describe('rendering', () => {
    it('renders the phone grid with initial phones', () => {
      mockUsePhoneList.mockReturnValue({
        data: mockPhoneList,
        isError: false,
      } as never);

      render(<PhoneList initialPhones={mockPhoneList} />);

      expect(
        screen.getByRole('list', { name: PHONE_LIST_STRINGS.gridAriaLabel })
      ).toBeInTheDocument();
    });

    it('renders all phones passed as initial data', () => {
      mockUsePhoneList.mockReturnValue({
        data: mockPhoneList,
        isError: false,
      } as never);

      render(<PhoneList initialPhones={mockPhoneList} />);

      expect(screen.getAllByRole('listitem')).toHaveLength(mockPhoneList.length);
    });

    it('renders the search bar', () => {
      mockUsePhoneList.mockReturnValue({
        data: mockPhoneList,
        isError: false,
      } as never);

      render(<PhoneList initialPhones={mockPhoneList} />);

      expect(screen.getByPlaceholderText(SEARCH_BAR_STRINGS.placeholder)).toBeInTheDocument();
    });
  });

  describe('search filtering', () => {
    it('filters phones by name', () => {
      const query = 'iph';

      const filtered = filterPhones(query);

      mockUsePhoneList
        .mockReturnValueOnce({ data: mockPhoneList, isError: false } as never)
        .mockReturnValueOnce({ data: filtered, isError: false } as never);

      render(<PhoneList initialPhones={mockPhoneList} />);

      fireEvent.change(screen.getByRole('searchbox'), {
        target: { value: query },
      });

      expect(screen.getAllByRole('listitem')).toHaveLength(filtered.length);
    });

    it('filters phones by brand', () => {
      const query = 'samsung';
      const filtered = filterPhones(query);

      mockUsePhoneList
        .mockReturnValueOnce({ data: mockPhoneList, isError: false } as never)
        .mockReturnValueOnce({ data: filtered, isError: false } as never);

      render(<PhoneList initialPhones={mockPhoneList} />);

      fireEvent.change(screen.getByRole('searchbox'), {
        target: { value: query },
      });

      expect(screen.getAllByRole('listitem')).toHaveLength(filtered.length);
    });

    it('filters phones matching brand or name simultaneously', () => {
      const query = 'galaxy';
      const filtered = filterPhones(query);

      mockUsePhoneList
        .mockReturnValueOnce({ data: mockPhoneList, isError: false } as never)
        .mockReturnValueOnce({ data: filtered, isError: false } as never);

      render(<PhoneList initialPhones={mockPhoneList} />);

      fireEvent.change(screen.getByRole('searchbox'), {
        target: { value: query },
      });

      expect(screen.getAllByRole('listitem')).toHaveLength(filtered.length);
    });

    it('shows 0 results when search has no matches', () => {
      mockUsePhoneList
        .mockReturnValueOnce({ data: mockPhoneList, isError: false } as never)
        .mockReturnValueOnce({ data: [], isError: false } as never);

      render(<PhoneList initialPhones={mockPhoneList} />);

      fireEvent.change(screen.getByRole('searchbox'), {
        target: { value: 'qwertyuiop' },
      });

      expect(screen.queryAllByRole('listitem')).toHaveLength(0);
      expect(screen.getByText(SEARCH_BAR_STRINGS.results(0))).toBeInTheDocument();
    });

    it('clears search and restores initial phones', () => {
      const query = 'apple';
      const filtered = filterPhones(query);

      mockUsePhoneList
        .mockReturnValueOnce({ data: mockPhoneList, isError: false } as never)
        .mockReturnValueOnce({ data: filtered, isError: false } as never)
        .mockReturnValueOnce({ data: mockPhoneList, isError: false } as never);

      render(<PhoneList initialPhones={mockPhoneList} />);

      fireEvent.change(screen.getByRole('searchbox'), {
        target: { value: query },
      });

      fireEvent.click(screen.getByLabelText(SEARCH_BAR_STRINGS.clearAriaLabel));

      expect(screen.getAllByRole('listitem')).toHaveLength(mockPhoneList.length);
    });

    it('does not filter when search term is shorter than 3 characters', () => {
      mockUsePhoneList.mockReturnValue({
        data: mockPhoneList,
        isError: false,
      } as never);

      render(<PhoneList initialPhones={mockPhoneList} />);

      fireEvent.change(screen.getByRole('searchbox'), {
        target: { value: 'sa' },
      });

      expect(screen.getAllByRole('listitem')).toHaveLength(mockPhoneList.length);
    });
  });

  describe('error handling', () => {
    it('shows error message when request fails', () => {
      mockUsePhoneList.mockReturnValue({
        data: [],
        isError: true,
      } as never);

      render(<PhoneList initialPhones={[]} />);

      expect(screen.getByText(PHONE_LIST_STRINGS.errorMessage)).toBeInTheDocument();
    });

    it('does not render the grid when there is an error', () => {
      mockUsePhoneList.mockReturnValue({
        data: [],
        isError: true,
      } as never);

      render(<PhoneList initialPhones={[]} />);

      expect(
        screen.queryByRole('list', { name: PHONE_LIST_STRINGS.gridAriaLabel })
      ).not.toBeInTheDocument();
    });
  });
});
