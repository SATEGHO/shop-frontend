import { FC } from 'react';
import styles from './Header.module.scss';
import logo from '@/assets/logo.webp';
import Button from '@/components/ui/button/Button';
import { ButtonVariant } from '@/types/button.types';
import { useNavigate } from 'react-router-dom';

const Header: FC = () => {
  const router = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.body}>
        <div className={styles.logo}>
          <img src={logo} alt="Logo image" className={styles.img} />
        </div>
        <div className={styles.items}>
          <Button variant={ButtonVariant.blue} onClick={() => router(`/admin/products`)}>
            Товары
          </Button>
          <Button variant={ButtonVariant.blue} onClick={() => router(`/admin/categories`)}>
            Категории
          </Button>
          <Button variant={ButtonVariant.blue} onClick={() => router(`/admin/manufacturers`)}>
            Производители
          </Button>
          <Button variant={ButtonVariant.secondaryOutlined} onClick={() => router(`/products`)}>
            Вернуться на сайт
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
