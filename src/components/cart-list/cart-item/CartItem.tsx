import { ICartItem } from '@/types/cart-item.interface';
import { FC, useEffect, useState } from 'react';
import styles from './CartItem.module.scss';
import { formatPrice } from '@/utils/formatPrice';
import { useDeleteFromCart, useUpdateCartItem } from '@/services/react-query/cart.queries';
import useDebounce from '@/hooks/useDebounce';
import { useNavigate } from 'react-router-dom';

interface Props {
  cartItem: ICartItem;
}

const CartItem: FC<Props> = ({ cartItem }) => {
  const router = useNavigate();
  const [count, setCount] = useState<number>(cartItem.quantity);
  const [isClicked, setIsClicked] = useState(false);
  const debouncedCount = useDebounce(count, 250);
  const { mutate: mutateDelete } = useDeleteFromCart(cartItem.id);
  const { mutate: mutateUpdate } = useUpdateCartItem(cartItem.id, debouncedCount);

  const handleCountClick = (action: string) => {
    setCount((prev) => (action === 'inc' ? prev + 1 : prev - 1));
    setIsClicked(true);
  };

  useEffect(() => {
    if (isClicked) {
      mutateUpdate();
    }
  }, [debouncedCount]);

  return (
    <div className={styles['cart-item']}>
      <div className={styles.body}>
        <div className={styles['left-side']}>
          <div
            className={styles['img-wrapper']}
            onClick={() => router(`/products/${cartItem.product.id}`)}>
            <img src={cartItem.product.image} alt={cartItem.product.name} />
          </div>
          <div className={styles.info}>
            <div className={styles.id}>Код товара: {cartItem.product.id}</div>
            <span
              className={styles.name}
              onClick={() => router(`/products/${cartItem.product.id}`)}>
              {cartItem.product.name}
            </span>
            <div className={styles.quantity}>
              <div className={styles.btns}>
                <button
                  className={styles.btn}
                  onClick={() => handleCountClick('dec')}
                  disabled={count === 1}>
                  -
                </button>
                <span className={styles.count}>{count}</span>
                <button
                  className={styles.btn}
                  onClick={() => handleCountClick('inc')}
                  disabled={count === cartItem.product.quantity}>
                  +
                </button>
              </div>
              {cartItem.quantity > 1 && (
                <div className={styles.one}>{formatPrice(cartItem.product.price)} / шт.</div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.price}>
          {formatPrice(cartItem.product.price * cartItem.quantity)}
        </div>
        <div className={styles.actions}>
          <button className={`${styles.btn} fas fa-trash`} onClick={() => mutateDelete()}></button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
