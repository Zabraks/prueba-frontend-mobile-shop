'use client';

import styles from './Grid.module.scss';

interface GridProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  ariaLabel: string;
  keyExtractor: (item: T, key: number) => string;
  variant?: 'default' | 'extended';
}

export const Grid = <T,>({
  items,
  renderItem,
  ariaLabel,
  keyExtractor,
  variant = 'default',
}: GridProps<T>) => {
  return (
    <ul className={styles.grid} aria-label={ariaLabel} data-variant={variant}>
      {items.map((item, key) => (
        <li key={keyExtractor(item, key)} className={styles.item}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
};
