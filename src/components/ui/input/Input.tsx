import { FC, InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return <input {...props} className={styles.input} />;
};

export default Input;
