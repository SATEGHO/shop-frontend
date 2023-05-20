import { ButtonHTMLAttributes, FC } from 'react';
import styles from './Close.module.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Close: FC<Props> = (rest) => {
  return (
    <button {...rest} className={styles.close}>
      <span className="fa-solid fa-xmark"></span>
    </button>
  );
};

export default Close;
