'use client';

import { useCartContext } from '@/context/CartContext/CartContext';
import { CartItem } from './CartItem/CartItem';
import { CartFooter } from './CartFooter/CartFooter';
import { CART_STRINGS } from './constants';
import styles from './Cart.module.scss';

export const Cart = () => {
  const { items, removeItem, totalPrice, totalItems } = useCartContext();

  const clearCart = () => {
    items.forEach((item) => removeItem(item.id));
  };

  const handlePayCart = () => {
    clearCart();
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{CART_STRINGS.title(totalItems)}</h1>

      <ul className={styles.list} aria-label="Cart items">
        {items.map((item, key) => (
          <li key={`${key}-${item.name}`}>
            <CartItem item={item} onRemove={() => removeItem(item.id)} />
          </li>
        ))}
      </ul>

      <CartFooter totalPrice={totalPrice} hasItems={totalItems > 0} onPay={handlePayCart} />
    </div>
  );
};
