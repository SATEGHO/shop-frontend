import { BaseHTMLAttributes, FC } from 'react';
import styles from './TitlePage.module.scss';

interface Props extends BaseHTMLAttributes<HTMLElement> {}

const TitlePage: FC<Props> = ({ children }) => {
  return <h2 className={styles.title}>{children}</h2>;
};

export default TitlePage;
