import { API_CONFIG } from '@/config/api';

export const httpClient = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`${API_CONFIG.baseUrl}${endpoint}`, {
    headers: {
      'x-api-key': API_CONFIG.apiKey ?? '',
      accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`API error ${response.status}: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
};
