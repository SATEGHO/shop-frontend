import { FC } from 'react';
import styles from './OrderProductItem.module.scss';
import { IOrderItem } from '@/types/order.interface';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '@/utils/formatPrice';

interface Props {
  orderItem: IOrderItem;
}

const OrderProductItem: FC<Props> = ({ orderItem }) => {
  const router = useNavigate();

  return (
    <div className={styles['product-item']}>
      <div className={styles.body}>
        <div className={styles['left-side']}>
          <div
            className={styles['img-wrapper']}
            onClick={() => router(`/products/${orderItem.product.id}`)}>
            <img
              src={`${import.meta.env.VITE_API_URL}/uploads/${orderItem.product.image}`}
              alt={orderItem.product.name}
            />
          </div>
          <div className={styles.info}>
            <div className={styles.id}>Код товара: {orderItem.product.id}</div>
            <span
              className={styles.name}
              onClick={() => router(`/products/${orderItem.product.id}`)}>
              {orderItem.product.name}
            </span>
            <div className={styles.quantity}>Количество: {orderItem.quantity} шт.</div>
          </div>
        </div>
        <div className={styles.price}>
          {formatPrice(orderItem.product.price * orderItem.quantity)}
        </div>
      </div>
    </div>
  );
};

export default OrderProductItem;
