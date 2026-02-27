import { useQuery } from '@tanstack/react-query';
import { phoneService } from '@/services/phone/phoneService';

export const phoneDetailKey = (id: string) => ['phones', 'detail', id] as const;

export const usePhoneDetail = (id: string) => {
  return useQuery({
    queryKey: phoneDetailKey(id),
    queryFn: () => phoneService.getPhoneById(id),
    enabled: !!id,
  });
};
