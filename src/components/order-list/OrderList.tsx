import { FC } from 'react';
import styles from './OrderList.module.scss';
import { IOrder } from '@/types/order.interface';
import OrderItem from './order-item/OrderItem';

interface Props {
  orders: IOrder[];
}

const OrderList: FC<Props> = ({ orders }) => {
  return (
    <div className={styles.list}>
      {orders.map((order) => (
        <OrderItem order={order} key={order.id} />
      ))}
    </div>
  );
};

export default OrderList;
