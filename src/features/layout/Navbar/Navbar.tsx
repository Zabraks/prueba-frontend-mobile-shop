import Link from 'next/link';
import styles from './Navbar.module.scss';
import { LogoIcon } from '@/assets/icons/LogoIcon';
import { ROUTES } from '@/lib/routes';
import { NAVBAR_STRINGS } from './constants';

import { CartLink } from './CartLink/CartLink';

export const Navbar = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label={NAVBAR_STRINGS.mainNavigationLabel}>
        <Link href={ROUTES.phones} aria-label={NAVBAR_STRINGS.logoAriaLabel}>
          <LogoIcon className={styles.logo} aria-hidden="true" />
        </Link>
        <CartLink />
      </nav>
    </header>
  );
};
