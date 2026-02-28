'use client';

import { useRef } from 'react';
import { Input } from '@/ui/Input/Input';
import { SEARCH_BAR_STRINGS } from './constants';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  resultsCount: number;
}

export const SearchBar = ({ value, onChange, resultsCount }: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrapper}>
        <Input
          ref={inputRef}
          type="search"
          placeholder={SEARCH_BAR_STRINGS.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={SEARCH_BAR_STRINGS.inputAriaLabel}
        />
        {value && (
          <button
            className={styles.clear}
            onClick={handleClear}
            aria-label={SEARCH_BAR_STRINGS.clearAriaLabel}
          >
            ✕
          </button>
        )}
      </div>
      <div className={styles.meta} aria-live="polite" aria-atomic="true">
        <span>{SEARCH_BAR_STRINGS.results(resultsCount)}</span>
      </div>
    </div>
  );
};
