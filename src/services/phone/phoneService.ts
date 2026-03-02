import { httpClient } from '../http/httpClient';
import type {
  FetchPhonesListParams,
  ApiPhone,
  ApiPhoneDetail as ApiPhoneDetailType,
} from '@/services/phone/phone.api.types';
import type { PhoneListItem, PhoneDetail } from '@/domain/phone/phone.types';
import { mapPhone, mapPhoneDetail } from './phone.mapper';
import { API_CONFIG } from '@/config/api';

export const phoneService = {
  getPhoneList: async ({ search, limit, offset }: FetchPhonesListParams = {}): Promise<
    PhoneListItem[]
  > => {
    const queryParams = new URLSearchParams();

    if (search) queryParams.append('search', search);
    if (limit) queryParams.append('limit', String(limit));
    if (offset) queryParams.append('offset', String(offset));

    const query = `?${queryParams.toString()}` || '';
    const apiPhones = await httpClient<ApiPhone[]>(
      `/products${query}`,
      API_CONFIG.revalidate.phoneList
    );

    return apiPhones.map(mapPhone);
  },
  getPhoneById: async (id: string): Promise<PhoneDetail> => {
    const apiPhoneDetail = await httpClient<ApiPhoneDetailType>(
      `/products/${id}`,
      API_CONFIG.revalidate.phoneDetail
    );
    return mapPhoneDetail(apiPhoneDetail);
  },
};
