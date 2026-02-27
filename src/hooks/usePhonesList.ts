import { useQuery } from '@tanstack/react-query';
import { phoneService } from '@/services/phone/phoneService';
import { FetchPhonesListParams } from '@/services/phone/phone.types';

export const phoneKeys = {
  all: ['phones'] as const,
  list: (params: FetchPhonesListParams) => ['phones', 'list', params] as const,
};

export const usePhones = (params: FetchPhonesListParams = {}) => {
  return useQuery({
    queryKey: phoneKeys.list(params),
    queryFn: () => phoneService.getPhoneList(params),
    placeholderData: (previousData) => previousData,
  });
};
