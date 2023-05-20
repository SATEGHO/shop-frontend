import Header from '@/components/header/Header';
import { FC } from 'react';
import styles from './MainLayout.module.scss';
import ModalAuth from '@/components/modals/modal-auth/ModalAuth';
import { Outlet } from 'react-router-dom';

const MainLayout: FC = () => {
  return (
    <div className="layout">
      <div className={styles.container}>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
      <ModalAuth />
    </div>
  );
};

export default MainLayout;
