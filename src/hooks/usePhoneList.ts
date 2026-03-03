import { useQuery } from '@tanstack/react-query';
import { phoneService } from '@/services/phone/phoneService';
import type { FetchPhonesListParams } from '@/services/phone/phone.api.types';
import type { PhoneListItem } from '@/domain/phone/phone.types';
import { API_CONFIG } from '@/config/api';
import { phoneKeys } from '@/services/phone/phonesKeys';

export const usePhoneList = (initialData?: PhoneListItem[], params: FetchPhonesListParams = {}) => {
  return useQuery<PhoneListItem[]>({
    queryKey: phoneKeys.list(params),
    queryFn: () => phoneService.getPhoneList(params),
    initialData,
    placeholderData: (previousData) => previousData,
    staleTime: API_CONFIG.cache.staleTime.phoneList * 1000,
  });
};
