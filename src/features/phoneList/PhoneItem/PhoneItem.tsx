import Link from 'next/link';
import Image from 'next/image';
import { PhoneListItem } from '@/domain/phone/phone.types';
import { ROUTES } from '@/lib/routes';
import { PHONE_CARD_STRINGS } from './constants';
import styles from './PhoneItem.module.scss';
import { Card } from '@/ui/Card/Card';

interface PhoneItemProps {
  phone: PhoneListItem;
}

export const PhoneItem = ({ phone }: PhoneItemProps) => {
  const { id, brand, name, basePrice, imageUrl } = phone;

  return (
    <Link href={ROUTES.phoneDetail(id)} aria-label={PHONE_CARD_STRINGS.ariaLabel(brand, name)}>
      <Card className={styles.phoneCard}>
        <div className={styles.imageWrapper}>
          <Image
            src={imageUrl}
            alt={PHONE_CARD_STRINGS.imageAlt(brand, name)}
            fill
            sizes="(max-width: 767px) 50vw, 20vw"
            className={styles.image}
          />
        </div>
        <div className={styles.info}>
          <div className={styles.left}>
            <span className={styles.brand}>{brand.toUpperCase()}</span>
            <span className={styles.name}>{name.toUpperCase()}</span>
          </div>
          <span className={styles.price}>
            {basePrice} {PHONE_CARD_STRINGS.currency}
          </span>
        </div>
      </Card>
    </Link>
  );
};
