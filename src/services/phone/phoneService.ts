import { httpClient } from '../http/httpClient';
import type {
  FetchPhonesListParams,
  ApiPhone,
  ApiPhoneDetail as ApiPhoneDetailType,
} from '@/services/phone/phone.api.types';
import type { PhoneListItem, PhoneDetail } from '@/domain/phone/phone.types';
import { mapPhone, mapPhoneDetail } from './phone.mapper';

export const phoneService = {
  getPhoneList: async ({ search, limit = 20, offset }: FetchPhonesListParams = {}): Promise<
    PhoneListItem[]
  > => {
    const queryParams = new URLSearchParams();

    if (search) queryParams.append('search', search);
    if (limit) queryParams.append('limit', String(limit));
    if (offset) queryParams.append('offset', String(offset));

    const query = `?${queryParams.toString()}` || '';
    const apiPhones = await httpClient<ApiPhone[]>(`/products${query}`);

    return apiPhones.map(mapPhone);
  },
  getPhoneById: async (id: string): Promise<PhoneDetail> => {
    const apiPhoneDetail = await httpClient<ApiPhoneDetailType>(`/products/${id}`);
    return mapPhoneDetail(apiPhoneDetail);
  },
};
