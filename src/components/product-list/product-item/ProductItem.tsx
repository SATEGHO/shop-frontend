import { IProduct } from '@/types/product.interface';
import { FC } from 'react';
import styles from './ProductItem.module.scss';
import Button from '@/components/ui/button/Button';
import { formatPrice } from '@/utils/formatPrice';
import { ButtonVariant } from '@/types/button.types';
import { useAddToCart } from '@/services/react-query/cart.queries';
import Loader from '@/components/ui/loader/Loader';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/user.store';

interface Props {
  product: IProduct;
  inCart: boolean;
}

const ProductItem: FC<Props> = ({ product, inCart }) => {
  const { mutate, isLoading } = useAddToCart(product.id);
  const router = useNavigate();
  const user = useUserStore((state) => state.user);

  const handleAddCart = () => {
    if (!inCart && user) {
      mutate();
    } else {
      router('/cart');
    }
  };

  return (
    <div className={styles.product}>
      <div className={styles['img-wrapper']} onClick={() => router(`/products/${product.id}`)}>
        <img
          src={`${import.meta.env.VITE_API_URL}/uploads/${product.image}`}
          alt={product.name}
          className={styles.img}
        />
      </div>
      <div className={styles.body}>
        <div className={styles['body-top']}>
          <span className={styles.title} onClick={() => router(`/products/${product.id}`)}>
            {product.name}
          </span>
          <p className={styles.price}>{formatPrice(product.price)}</p>
        </div>
        <div className={styles['body-bottom']}>
          <div className={styles.btns}>
            <Button
              variant={inCart ? ButtonVariant.secondaryOutlined : ButtonVariant.outlined}
              onClick={handleAddCart}
              disabled={isLoading || product.quantity === 0}>
              {inCart ? (
                'В корзине'
              ) : isLoading ? (
                <>
                  <Loader size={'sm'} style={{ marginRight: 10 }} />В корзину
                </>
              ) : (
                'В корзину'
              )}
            </Button>
          </div>
          <div className={styles.quantity}>
            <i className={`${styles.icon} fas fa-cubes`}></i>
            {product.quantity > 0 ? <>{product.quantity} в наличии</> : 'Нет в наличии'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
