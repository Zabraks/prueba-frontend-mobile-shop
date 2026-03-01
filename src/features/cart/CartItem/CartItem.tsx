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
      <div className={styles.data}>
        <div className={styles.info}>
          <div className={styles.phone}>
            <p>{name}</p>
            <p>
              {selectedStorage} {CART_ITEM_STRINGS.specseparator} {selectedColor}
            </p>
          </div>
          <p>
            {price} {CART_ITEM_STRINGS.currency}
          </p>
        </div>
        <Button
          className={styles.removeButton}
          variant="danger"
          onClick={() => onRemove(item.id)}
          aria-label={CART_ITEM_STRINGS.removeAriaLabel(name)}
        >
          {CART_ITEM_STRINGS.remove}
        </Button>
      </div>
    </article>
  );
};
