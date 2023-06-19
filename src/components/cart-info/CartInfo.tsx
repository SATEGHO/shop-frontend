import { ICartItem } from '@/types/cart-item.interface';
import styles from './CartInfo.module.scss';
import { FC } from 'react';
import { formatPrice } from '@/utils/formatPrice';
import Button from '../ui/button/Button';
import { ButtonSize } from '@/types/button.types';
import { useCreateOrder } from '@/services/react-query/order.queries';

interface Props {
  cartItems: ICartItem[];
}

const CartInfo: FC<Props> = ({ cartItems }) => {
  const { mutate: createOrder, isLoading } = useCreateOrder();

  return (
    <div className={styles['cart-info']}>
      <div className={styles.body}>
        <div className={styles.header}>Ваш заказ</div>
        <div className={styles.products}>
          Количество товаров: <span className={styles.count}>{cartItems.length} шт.</span>
        </div>
        <div className={styles.total}>
          Итого:{' '}
          {formatPrice(
            cartItems.reduce(
              (acc, cartItem) => acc + cartItem.product.price * cartItem.quantity,
              0,
            ),
          )}
        </div>

        <Button
          style={{ background: '#28b611' }}
          size={ButtonSize.lg}
          onClick={() => createOrder()}
          disabled={isLoading}>
          Сделать заказ
        </Button>
      </div>
    </div>
  );
};

export default CartInfo;
