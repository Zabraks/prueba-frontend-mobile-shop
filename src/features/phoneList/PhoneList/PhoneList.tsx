//TODO: aqui estará el searchbar con tanstack query, por eso ponemos useClient
'use client';

import { usePhoneList } from '@/hooks/usePhoneList';
import styles from './PhoneList.module.scss';
import { Grid } from '@/ui/Grid/Grid';
import { PhoneListItem } from '@/domain/phone/phone.types';
import { PHONE_LIST_STRINGS } from './constants';
import { PhoneItem } from '@/features/phoneList/PhoneItem/PhoneItem';

interface PhoneListProps {
  initialPhones: PhoneListItem[];
}

export const PhoneList = ({ initialPhones }: PhoneListProps) => {
  const { data: phones = initialPhones, isError } = usePhoneList(initialPhones);

  if (isError) {
    return <p>{PHONE_LIST_STRINGS.errorMessage}</p>;
  }

  return (
    <div className={styles.wrapper}>
      {/* SEARCH BAR */}
      {/* GRID */}
      <Grid
        items={phones}
        keyExtractor={(phone, key) => `${phone.id}-${key}`}
        ariaLabel={PHONE_LIST_STRINGS.gridAriaLabel}
        renderItem={(phone) => <PhoneItem phone={phone} />}
      />
    </div>
  );
};
