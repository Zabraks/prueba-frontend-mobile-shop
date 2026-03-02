import Link from 'next/link';
import { Button } from '@/ui/Button/Button';
import { ERROR_VIEW_STRINGS } from './constants';
import type { ErrorSection, ErrorAction } from './constants';
import styles from './ErrorView.module.scss';

interface ErrorViewAction {
  action: ErrorAction;
  href?: string;
  onClick?: () => void;
}

interface ErrorViewProps {
  section: ErrorSection;
  actions: ErrorViewAction[];
}

export const ErrorView = ({ section, actions }: ErrorViewProps) => {
  const { message } = ERROR_VIEW_STRINGS[section];

  return (
    <div className={styles.wrapper}>
      <p className={styles.message}>{message}</p>
      <div className={styles.actions}>
        {actions.map((action) =>
          action.href ? (
            <Link key={action.action} href={action.href}>
              <Button variant="ghost">{ERROR_VIEW_STRINGS.action[action.action]}</Button>
            </Link>
          ) : (
            <Button key={action.action} variant="primary" onClick={action.onClick} type="button">
              {ERROR_VIEW_STRINGS.action[action.action]}
            </Button>
          )
        )}
      </div>
    </div>
  );
};
