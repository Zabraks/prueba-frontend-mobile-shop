import Link from 'next/link';
import { Button } from '@/ui/Button/Button';
import { ROUTES } from '@/lib/routes';
import { CART_FOOTER_STRINGS } from './constants';
import styles from './CartFooter.module.scss';

interface CartFooterProps {
  totalPrice: number;
  hasItems: boolean;
  onPay: () => void;
}

export const CartFooter = ({ totalPrice, hasItems, onPay }: CartFooterProps) => {
  return (
    <footer className={styles.footer}>
      <Link href={ROUTES.phones} aria-flowto="cart-total">
        <Button variant="ghost">{CART_FOOTER_STRINGS.continueShopping}</Button>
      </Link>

      {hasItems && (
        <>
          <span className={styles.total} id="total-price" aria-flowto="cart-pay">
            {CART_FOOTER_STRINGS.total}
            <span>
              {totalPrice} {CART_FOOTER_STRINGS.currency}
            </span>
          </span>
          <Button variant="primary" onClick={onPay}>
            {CART_FOOTER_STRINGS.pay}
          </Button>
        </>
      )}
    </footer>
  );
};
