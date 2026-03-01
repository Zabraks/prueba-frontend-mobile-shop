'use client';
import Link from 'next/link';
import styles from './CartLink.module.scss';
import { CartIcon } from '@/assets/icons/CartIcon';
import { ROUTES } from '@/lib/routes';
import { CART_LINK_STRINGS } from './constants';
import { useCartContext } from '@/context/CartContext';

export const CartLink = () => {
  const { totalItems } = useCartContext();
  return (
    <Link
      href={ROUTES.cart}
      className={styles.cartLink}
      aria-label={CART_LINK_STRINGS.cartAriaLabel(totalItems)}
    >
      <CartIcon className={styles.cartIcon} aria-hidden="true" />
      <span className={styles.cartCount}>{totalItems}</span>
    </Link>
  );
};
