import { useMemo } from 'react';
import { OptionSelector, type SelectorOption } from '@/ui/OptionSelector/OptionSelector';
import type { StorageOption } from '@/domain/phone/phone.types';
import { STORAGE_SELECTOR_STRINGS } from './constants';

interface StorageSelectorProps {
  options: StorageOption[];
  selected?: string;
  onChange: (option: StorageOption) => void;
}

export const StorageSelector = ({ options, selected, onChange }: StorageSelectorProps) => {
  const handleChange = (item: SelectorOption) => {
    const selectedOption = options.find((option) => option.capacity === item.value);
    if (selectedOption) {
      onChange(selectedOption);
    }
  };

  const mappedOptions = useMemo(
    () => options.map((o) => ({ label: o.capacity, value: o.capacity })),
    [options]
  );

  const selectedStorage = useMemo(() => {
    return mappedOptions.find((option) => option.value === selected)?.value ?? null;
  }, [selected, mappedOptions]);

  return (
    <OptionSelector
      options={mappedOptions}
      selected={selectedStorage}
      onChange={handleChange}
      ariaLabel={STORAGE_SELECTOR_STRINGS.ariaLabel}
    />
  );
};
