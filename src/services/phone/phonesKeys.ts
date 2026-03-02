import type { FetchPhonesListParams } from '@/services/phone/phone.types';

export const phoneKeys = {
  all: ['phones'] as const,
  list: (params: FetchPhonesListParams) => [...phoneKeys.all, 'list', params] as const,
  detail: (id: string) => [...phoneKeys.all, 'detail', id] as const,
};
