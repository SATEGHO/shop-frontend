import { FC, LabelHTMLAttributes } from 'react';
import styles from './Label.module.scss';

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {}

const Label: FC<Props> = ({ children, ...rest }) => {
  return (
    <label className={styles.label} {...rest}>
      {children}
    </label>
  );
};

export default Label;
