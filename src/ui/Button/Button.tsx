import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button = ({
  variant = 'primary',
  fullWidth = false,
  children,
  className,
  type,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type === 'submit' ? 'submit' : type === 'reset' ? 'reset' : 'button'}
      className={[
        styles.button,
        styles[variant],
        fullWidth ? styles.fullWidth : '',
        className ?? '',
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  );
};
