import { FC, InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const Input: FC<Props> = (rest) => {
  return <input {...rest} className={styles.input} />;
};

export default Input;
