import styles from './Grid.module.scss';

interface GridProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  ariaLabel: string;
  keyExtractor: (item: T, index: number) => string;
  variant?: 'default' | 'extended';
}

export const Grid = <T,>({
  items,
  renderItem,
  ariaLabel,
  keyExtractor,
  variant = 'default',
}: GridProps<T>) => (
  <ul className={styles.grid} aria-label={ariaLabel} data-variant={variant}>
    {items.map((item, index) => (
      <li key={keyExtractor(item, index)} className={styles.item}>
        {renderItem(item, index)}
      </li>
    ))}
  </ul>
);
