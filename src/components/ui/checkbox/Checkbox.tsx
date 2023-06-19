import React, { ChangeEvent, FC } from 'react';
import styles from './Checkbox.module.scss';

interface ICheckboxProps extends React.HTMLProps<HTMLInputElement> {
  variant?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: FC<ICheckboxProps> = ({ ...rest }) => {
  return <input type="checkbox" {...rest} className={styles.checkbox} />;
};

export default Checkbox;
