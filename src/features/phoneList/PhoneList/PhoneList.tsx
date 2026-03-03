'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { usePhoneList } from '@/hooks/usePhoneList';
import { useDebounce } from '@/hooks/useDebounce/useDebounce';
import styles from './PhoneList.module.scss';
import { SearchBar } from '../SearchBar/SearchBar';
import { Grid } from '@/ui/Grid/Grid';
import type { PhoneListItem } from '@/domain/phone/phone.types';
import { PhoneItem } from '@/features/phoneList/PhoneItem/PhoneItem';
import { PHONE_LIST_STRINGS } from './constants';
import { API_CONFIG } from '@/config/api';

interface PhoneListProps {
  initialPhones: PhoneListItem[];
}

export const PhoneList = ({ initialPhones }: PhoneListProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') ?? '');
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearch) {
      params.set('search', debouncedSearch);
    } else {
      params.delete('search');
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const { data: phones = initialPhones, isError } = usePhoneList(
    debouncedSearch ? undefined : initialPhones,
    debouncedSearch ? { search: debouncedSearch } : { limit: API_CONFIG.defaultLimit }
  );

  if (isError) {
    return <p>{PHONE_LIST_STRINGS.errorMessage}</p>;
  }

  return (
    <div className={styles.wrapper}>
      <h1 className="sr-only">{PHONE_LIST_STRINGS.title}</h1>
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
