import Link from 'next/link';
import { Button } from '@/ui/Button/Button';
import { ROUTES } from '@/lib/routes';
import { CART_FOOTER_STRINGS } from './constants';
import styles from './CartFooter.module.scss';

interface CartFooterProps {
  totalPrice: number;
  hasItems: boolean;
}

export const CartFooter = ({ totalPrice, hasItems }: CartFooterProps) => {
  return (
    <footer className={styles.footer}>
      <Link href={ROUTES.phones}>
        <Button variant="ghost">{CART_FOOTER_STRINGS.continueShopping}</Button>
      </Link>

      {hasItems && (
        <div className={styles.right}>
          <span className={styles.total}>
            {CART_FOOTER_STRINGS.total}
            <strong>
              {totalPrice} {CART_FOOTER_STRINGS.currency}
            </strong>
          </span>
          <Button variant="primary">{CART_FOOTER_STRINGS.pay}</Button>
        </div>
      )}
    </footer>
  );
};
