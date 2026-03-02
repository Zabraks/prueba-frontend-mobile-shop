import { useQuery } from '@tanstack/react-query';
import { phoneService } from '@/services/phone/phoneService';
import type { FetchPhonesListParams } from '@/services/phone/phone.types';
import type { PhoneListItem } from '@/domain/phone/phone.types';

export const phoneKeys = {
  all: ['phones'] as const,
  list: (params: FetchPhonesListParams) => ['phones', 'list', params] as const,
};

export const usePhoneList = (initialData?: PhoneListItem[], params: FetchPhonesListParams = {}) => {
  return useQuery({
    queryKey: phoneKeys.list(params),
    queryFn: () => phoneService.getPhoneList(params),
    initialData,
    placeholderData: (previousData) => previousData,
  });
};
