import { mockPhoneList } from '@/mocks/phonelist.mock';

export const getFilteredPhoneList = (search: string) => {
  const searchLower = search.toLowerCase();
  return mockPhoneList.filter(
    (phone) =>
      phone.name.toLowerCase().includes(searchLower) ||
      phone.brand.toLowerCase().includes(searchLower)
  );
};
