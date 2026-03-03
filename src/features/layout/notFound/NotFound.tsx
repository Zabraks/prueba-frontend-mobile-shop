import styles from './not-found.module.scss';
import { NOT_FOUND_STRINGS } from './constants';
import { ROUTES } from '@/config/routes';
import Link from 'next/link';
import { Button } from '@/ui/Button/Button';

export const NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.code}>{NOT_FOUND_STRINGS.errorCode}</p>
      <p className={styles.message}>{NOT_FOUND_STRINGS.message}</p>
      <Link href={ROUTES.phones}>
        <Button variant="ghost">{NOT_FOUND_STRINGS.action}</Button>
      </Link>
    </div>
  );
};
