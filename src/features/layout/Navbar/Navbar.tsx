import Link from 'next/link';
import styles from './Navbar.module.scss';
import { LogoIcon } from '@/assets/icons/LogoIcon';
import { CartIcon } from '@/assets/icons/CartIcon';
import { ROUTES } from '@/lib/routes';
import { NAVBAR_STRINGS } from './constants';

export const Navbar = () => {
  const cartCount = 0;
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label={NAVBAR_STRINGS.mainNavigationLabel}>
        <Link href={ROUTES.phones} aria-label={NAVBAR_STRINGS.logoAriaLabel}>
          <LogoIcon className={styles.logo} aria-hidden="true" />
        </Link>
        <Link
          href={ROUTES.cart}
          className={styles.cartLink}
          aria-label={NAVBAR_STRINGS.cartAriaLabel(cartCount)}
        >
          <CartIcon className={styles.cartIcon} aria-hidden="true" />
          <span className={styles.cartCount}>{cartCount}</span>
        </Link>
      </nav>
    </header>
  );
};
