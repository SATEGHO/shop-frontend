import { FC } from 'react';
import { IOrderItem } from '@/types/order.interface';
import OrderProductItem from './order-product-item/OrderProductItem';

interface Props {
  orderItems: IOrderItem[];
}

const OrderProductList: FC<Props> = ({ orderItems }) => {
  return (
    <div style={{ marginTop: 15 }}>
      {orderItems.map((orderItem) => (
        <OrderProductItem orderItem={orderItem} key={orderItem.id} />
      ))}
    </div>
  );
};

export default OrderProductList;
