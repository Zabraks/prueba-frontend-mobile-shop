'use client';

import { useState } from 'react';
import { usePhoneList } from '@/hooks/usePhoneList';
import { useDebounce } from '@/hooks/useDebounce/useDebounce';
import styles from './PhoneList.module.scss';
import { SearchBar } from '../SearchBar/SearchBar';
import { Grid } from '@/ui/Grid/Grid';
import { PhoneListItem } from '@/domain/phone/phone.types';
import { PhoneItem } from '@/features/phoneList/PhoneItem/PhoneItem';
import { PHONE_LIST_STRINGS } from './constants';

interface PhoneListProps {
  initialPhones: PhoneListItem[];
}

export const PhoneList = ({ initialPhones }: PhoneListProps) => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);

  const { data: phones = initialPhones, isError } = usePhoneList(
    initialPhones,
    debouncedSearch ? { search: debouncedSearch } : {}
  );

  if (isError) {
    return <p>{PHONE_LIST_STRINGS.errorMessage}</p>;
  }

  return (
    <div className={styles.wrapper}>
      <SearchBar value={search} onChange={setSearch} resultsCount={phones.length} />
      <Grid
        items={phones}
        keyExtractor={(phone, key) => `${phone.id}-${key}`}
        ariaLabel={PHONE_LIST_STRINGS.gridAriaLabel}
        renderItem={(phone, key) => <PhoneItem phone={phone} priority={key === 0} />}
      />
    </div>
  );
};
