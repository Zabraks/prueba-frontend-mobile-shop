import { useState, useEffect } from 'react';

export const MIN_SEARCH_LENGTH = 3;

export const useDebounce = (value: string, delay: number = 300): string => {
  const [debouncedValue, setDebouncedValue] = useState('');

  useEffect(() => {
    if (value.length < MIN_SEARCH_LENGTH) return;

    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  if (value.length < MIN_SEARCH_LENGTH) return '';

  return debouncedValue;
};
