import { render, screen } from '@testing-library/react';
import { PhoneList } from '@/features/phoneList/PhoneList/PhoneList';
import { PHONE_LIST_STRINGS } from '@/features/phoneList/PhoneList/constants';
import { mockPhoneList } from '@/mocks/phonelist.mock';

vi.mock('@/hooks/usePhoneList', () => ({
  usePhoneList: vi.fn(),
}));

import { usePhoneList } from '@/hooks/usePhoneList';

const mockUsePhoneList = vi.mocked(usePhoneList);

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
