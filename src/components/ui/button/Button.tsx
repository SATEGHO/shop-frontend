import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';
import styles from './Button.module.scss';
import { ButtonSize, ButtonVariant } from '@/types/button.types';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
}

const Button: FC<PropsWithChildren<Props>> = ({ children, size, variant, ...rest }) => {
  return (
    <button
      className={`${styles.button} ${variant ? styles[variant] : styles.primary} ${
        size ? styles[size] : styles.md
      }`}
      {...rest}>
      {children}
    </button>
  );
};

export default Button;
