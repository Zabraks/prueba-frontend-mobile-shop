import Link from 'next/link';
import { Button } from '@/ui/Button/Button';
import { ROUTES } from '@/config/routes';
import { CART_FOOTER_STRINGS } from './constants';
import styles from './CartFooter.module.scss';
import { APP_CONFIG } from '@/config/app';

interface CartFooterProps {
  totalPrice: number;
  hasItems: boolean;
  onPay: () => void;
}

export const CartFooter = ({ totalPrice, hasItems, onPay }: CartFooterProps) => {
  return (
    <footer className={styles.footer}>
      <Link href={ROUTES.phones} className={styles.continueLink}>
        <Button variant="ghost" className={styles.continueButton}>
          {CART_FOOTER_STRINGS.continueShopping}
        </Button>
      </Link>

      {hasItems && (
        <>
          <span className={styles.total}>
            {CART_FOOTER_STRINGS.total}
            <span>
              {totalPrice} {APP_CONFIG.currency}
            </span>
          </span>
          <Button variant="primary" className={styles.payButton} onClick={onPay}>
            {CART_FOOTER_STRINGS.pay}
          </Button>
        </>
      )}
    </footer>
  );
};
