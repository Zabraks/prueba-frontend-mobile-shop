export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? '',
  apiKey: process.env.NEXT_PUBLIC_API_KEY ?? '',
  defaultLimit: 20,
  minSearchLength: 3,
  debounceDelay: 400,
  cache: {
    staleTime: {
      phoneList: 60,
      phoneDetail: 300,
    },
    gcTime: 600,
  },
} as const;
