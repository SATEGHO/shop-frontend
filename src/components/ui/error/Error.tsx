import { BaseHTMLAttributes } from 'react';
import styles from './Error.module.scss';

interface Props extends BaseHTMLAttributes<HTMLDivElement> {
  children: any;
  variant?: string;
}

const Error = ({ children, variant, ...props }: Props) => {
  return (
    <div className={`${styles.error} ${variant ? styles[variant] : ''}`} {...props}>
      {children}
    </div>
  );
};

export default Error;
