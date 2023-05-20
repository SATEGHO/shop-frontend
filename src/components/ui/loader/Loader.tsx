import { BaseHTMLAttributes, FC } from 'react';
import styles from './Loader.module.scss';

interface Props extends BaseHTMLAttributes<HTMLElement> {
  size?: string;
}

const Loader: FC<Props> = ({ size, ...rest }) => {
  return <span className={`${styles.loader} ${size ? styles[size] : styles.md}`} {...rest}></span>;
};

export default Loader;
