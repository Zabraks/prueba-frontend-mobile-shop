import { QueryClient } from '@tanstack/react-query';
import { API_CONFIG } from '@/config/api';

export const queryClientConf = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      gcTime: API_CONFIG.cache.gcTime * 1000,
      refetchOnWindowFocus: false,
    },
  },
});
