import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import styles from './AdminLayout.module.scss';
import ModalCreateCategory from '@/components/modals/modal-create-category/ModalCreateCategory';
import ModalCreateManufacturer from '@/components/modals/modal-create-manufacturer/ModalCreateManufacturer';
import ModalCreateProduct from '@/components/modals/modal-create-product/ModalCreateProduct';

const AdminLayout = () => {
  return (
    <div className="layout">
      <div className={styles.container}>
        <Header />
        <main>
          <Outlet />
        </main>
        <ModalCreateCategory />
        <ModalCreateManufacturer />
        <ModalCreateProduct />
      </div>
    </div>
  );
};

export default AdminLayout;
