import { FC, useState } from 'react';
import styles from './OrderItem.module.scss';
import { IOrder } from '@/types/order.interface';
import { formatDate } from '@/utils/formatDate';
import { formatPrice } from '@/utils/formatPrice';
import Button from '@/components/ui/button/Button';
import { ButtonSize, ButtonVariant } from '@/types/button.types';
import OrderProductList from './order-products-list/OrderProductList';

interface Props {
  order: IOrder;
}

const OrderItem: FC<Props> = ({ order }) => {
  const [isShowItems, setIsShowItems] = useState(false);

  return (
    <div className={styles.order}>
      <div className={styles.body}>
        <div className={styles.header}>
          <div className={styles.id}>ID Заказа: {order.id}</div>
          <div className={styles.price}>{formatPrice(order.price)}</div>
        </div>
        <div className={styles.info}>
          <div className={styles.created}>
            Дата создания заказа:{' '}
            <span style={{ fontWeight: 500 }}>{formatDate(order.createdAt)}</span>
          </div>
          <div className={styles.count}>
            Количество товаров:{' '}
            <span style={{ fontWeight: 500 }}>{order.orderItems.length} шт.</span>
          </div>
        </div>
        <div className={styles.actions}>
          <Button
            variant={ButtonVariant.secondaryOutlined}
            size={ButtonSize.sm}
            onClick={() => setIsShowItems((prev) => !prev)}>
            {isShowItems ? 'Скрыть товары' : 'Показать товары'}
          </Button>
        </div>
        {isShowItems && <OrderProductList orderItems={order.orderItems} />}
      </div>
    </div>
  );
};

export default OrderItem;
