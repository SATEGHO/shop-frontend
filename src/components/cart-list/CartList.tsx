import { ICartItem } from '@/types/cart-item.interface';
import styles from './CartList.module.scss';
import { FC } from 'react';
import CartItem from './cart-item/CartItem';

interface Props {
  cartItems: ICartItem[];
}

const CartList: FC<Props> = ({ cartItems }) => {
  return (
    <div className={styles.list}>
      {cartItems.map((cartItem) => (
        <CartItem cartItem={cartItem} key={cartItem.id} />
      ))}
    </div>
  );
};

export default CartList;
