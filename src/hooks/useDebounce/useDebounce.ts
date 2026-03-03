import { useState, useEffect } from 'react';
import { API_CONFIG } from '@/config/api';

export const useDebounce = (value: string, delay: number = API_CONFIG.debounceDelay): string => {
  const [debouncedValue, setDebouncedValue] = useState('');

  useEffect(() => {
    if (value.length < API_CONFIG.minSearchLength) return;

    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  if (value.length < API_CONFIG.minSearchLength) return '';

  return debouncedValue;
};
