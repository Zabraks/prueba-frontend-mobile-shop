import { QueryClient } from '@tanstack/react-query';

export const queryClientConf = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
