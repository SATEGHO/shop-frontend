import TitlePage from '@/components/ui/title-page/TitlePage';
import styles from './OrdersPage.module.scss';
import { FC } from 'react';
import { useGetAllOrdersQuuery } from '@/services/react-query/order.queries';
import OrderList from '@/components/order-list/OrderList';
import Loader from '@/components/ui/loader/Loader';

const OrdersPage: FC = () => {
  const { data: orders, isLoading } = useGetAllOrdersQuuery();

  return (
    <div>
      <TitlePage>Заказы</TitlePage>
      <div className={styles.container}>
        {isLoading ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}>
            <Loader size="lg" />
          </div>
        ) : orders && orders.length ? (
          <OrderList orders={orders} />
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}>
            <p style={{ textAlign: 'center', fontSize: 16, color: 'gray' }}>Заказов не найдено</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
