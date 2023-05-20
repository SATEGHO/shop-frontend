import { BaseHTMLAttributes, FC } from 'react';
import styles from './HeaderButton.module.scss';

interface Props extends BaseHTMLAttributes<HTMLElement> {
  icon: string;
}

const HeaderButton: FC<Props> = ({ icon, children, ...rest }) => {
  return (
    <div className={styles.btn} {...rest}>
      <i className={icon}></i>
      {children}
    </div>
  );
};

export default HeaderButton;
