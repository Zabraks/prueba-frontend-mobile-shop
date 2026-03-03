import { useQuery } from '@tanstack/react-query';
import { phoneService } from '@/services/phone/phoneService';
import { API_CONFIG } from '@/config/api';
import { phoneKeys } from '@/services/phone/phonesKeys';

export const usePhoneDetail = (id: string) => {
  return useQuery({
    queryKey: phoneKeys.detail(id),
    queryFn: () => phoneService.getPhoneById(id),
    enabled: !!id,
    staleTime: API_CONFIG.revalidate.phoneDetail * 1000,
  });
};
