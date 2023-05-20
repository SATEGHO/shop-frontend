import { ICartItem } from '@/types/cart-item.interface';
import styles from './CartInfo.module.scss';
import { FC } from 'react';
import { formatPrice } from '@/utils/formatPrice';
import Button from '../ui/button/Button';
import { ButtonSize } from '@/types/button.types';

interface Props {
  cartItems: ICartItem[];
}

const CartInfo: FC<Props> = ({ cartItems }) => {
  return (
    <div className={styles['cart-info']}>
      <div className={styles.body}>
        <div className={styles.header}>Ваш заказ</div>
        <div className={styles.products}>
          Количество товаров <span className={styles.count}>{cartItems.length}</span>
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

        <Button style={{ background: '#28b611' }} size={ButtonSize.lg}>
          Сделать заказ
        </Button>
      </div>
    </div>
  );
};

export default CartInfo;
