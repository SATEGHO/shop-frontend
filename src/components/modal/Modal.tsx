import { BaseHTMLAttributes, FC } from 'react';
import styles from './Modal.module.scss';
import Close from '@/components/ui/close/Close';

interface Props extends BaseHTMLAttributes<HTMLDivElement> {
  title: string;
  open: boolean;
  onClose: () => void;
  children: any;
}

const Modal: FC<Props> = ({ title, open, onClose, children, ...props }) => {
  return (
    <div className={`${styles.wrapper} ${open ? styles.active : ''}`}>
      <div className={styles.container}>
        <div className={styles.modal} {...props} onClick={(e) => e.stopPropagation()}>
          <div className={styles.header}>
            <div className={styles.title}>{title}</div>
            <Close onClick={onClose} />
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
