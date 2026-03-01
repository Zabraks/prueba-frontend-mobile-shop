import Image from 'next/image';
import { CartItem as CartItemType } from '@/domain/cart/cart.types';
import { Button } from '@/ui/Button/Button';
import { CART_ITEM_STRINGS } from './constants';
import styles from './CartItem.module.scss';

interface CartItemProps {
  item: CartItemType;
  onRemove: (phoneId: string) => void;
}

export const CartItem = ({ item, onRemove }: CartItemProps) => {
  const { name, img, selectedStorage, selectedColor, price } = item;

  return (
    <article className={styles.wrapper} aria-label={name}>
      <div className={styles.imageWrapper}>
        <Image src={img} alt={name} fill sizes="120px" className={styles.image} />
      </div>
      <div className={styles.info}>
        <p className={styles.name}>{name.toUpperCase()}</p>
        <p className={styles.specs}>
          {selectedStorage} {CART_ITEM_STRINGS.specseparator} {selectedColor?.toUpperCase()}
        </p>
        <p className={styles.price}>
          {price} {CART_ITEM_STRINGS.currency}
        </p>
        <Button
          variant="danger"
          onClick={() => onRemove()}
          aria-label={CART_ITEM_STRINGS.removeAriaLabel(name)}
        >
          {CART_ITEM_STRINGS.remove}
        </Button>
      </div>
    </article>
  );
};
