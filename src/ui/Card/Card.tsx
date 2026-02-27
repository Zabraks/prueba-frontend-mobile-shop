import styles from './Card.module.scss';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => (
  <article className={`${styles.card} ${className ?? ''}`}>{children}</article>
);
