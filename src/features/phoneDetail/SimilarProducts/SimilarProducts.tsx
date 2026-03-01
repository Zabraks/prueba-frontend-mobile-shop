import { PhoneListItem } from '@/domain/phone/phone.types';
import { Grid } from '@/ui/Grid/Grid';
import { PhoneItem } from '@/features/phoneList/PhoneItem/PhoneItem';
import styles from './SimilarProducts.module.scss';
import { SIMILAR_PRODUCTS_STRINGS } from './constants';

interface SimilarProductsProps {
  phones: PhoneListItem[];
}

export const SimilarProducts = ({ phones }: SimilarProductsProps) => {
  return (
    <section className={styles.wrapper} aria-label={SIMILAR_PRODUCTS_STRINGS.title}>
      <h2 className={styles.title}>{SIMILAR_PRODUCTS_STRINGS.title}</h2>
      <Grid
        items={phones}
        keyExtractor={(phone, key) => `${phone.id}-${key}`}
        ariaLabel={SIMILAR_PRODUCTS_STRINGS.gridAriaLabel}
        renderItem={(phone) => <PhoneItem phone={phone} />}
      />
    </section>
  );
};
