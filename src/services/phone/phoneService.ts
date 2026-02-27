import { httpClient } from '../http/httpClient';
import type { FetchPhonesListParams } from '@/services/phone/phone.types';
import type { PhoneListItem, PhoneDetail } from '@/domain/phone/phone.types';

export const phoneService = {
  getPhoneList: ({ search, limit = 20, offset }: FetchPhonesListParams = {}): Promise<
    PhoneListItem[]
  > => {
    const queryParams = new URLSearchParams();

    if (search) queryParams.append('search', search);
    if (limit) queryParams.append('limit', String(limit));
    if (offset) queryParams.append('offset', String(offset));

    const query = `?${queryParams.toString()}` || '';
    return httpClient(`/products${query}`);
  },
  getPhoneById: (id: string): Promise<PhoneDetail> => httpClient(`/products/${id}`),
};
