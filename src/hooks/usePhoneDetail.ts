import { useQuery } from '@tanstack/react-query';
import { phoneService } from '@/services/phone/phoneService';
import { API_CONFIG } from '@/config/api';
import { phoneKeys } from '@/services/phone/phonesKeys';
import type { PhoneDetail } from '@/domain/phone/phone.types';

export const usePhoneDetail = (id: string) => {
  return useQuery<PhoneDetail>({
    queryKey: phoneKeys.detail(id),
    queryFn: () => phoneService.getPhoneById(id),
    enabled: !!id,
    staleTime: API_CONFIG.cache.staleTime.phoneDetail * 1000,
  });
};
