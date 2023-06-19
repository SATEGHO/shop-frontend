import TitlePage from '@/components/ui/title-page/TitlePage';
import { useGetProductById } from '@/services/react-query/product.queries';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './ProductItemPage.module.scss';
import { formatPrice } from '@/utils/formatPrice';
import Button from '@/components/ui/button/Button';
import { ButtonSize, ButtonVariant } from '@/types/button.types';
import { useUserStore } from '@/store/user.store';
import { useAddToCart } from '@/services/react-query/cart.queries';
import { useCartStore } from '@/store/cart.store';
import Loader from '@/components/ui/loader/Loader';

const ProductItemPage = () => {
  const params = useParams();
  const router = useNavigate();
  const user = useUserStore((state) => state.user);
  const productsIdsCart = useCartStore((state) => state.productsIdsCart);

  const { data: product } = useGetProductById(params.id as string);
  const { mutate, isLoading } = useAddToCart(product?.id as string);

  const inCart = product ? productsIdsCart.includes(product.id) : false;

  const handleAddCart = () => {
    if (product) {
      if (!inCart && user) {
        mutate();
      } else {
        router('/cart');
      }
    }
  };

  return (
    <div>
      {product && (
        <div>
          <TitlePage>{product.name}</TitlePage>
          <div className={styles.product}>
            <div className={styles.col}>
              <div className={styles['img-wrapper']}>
                <img
                  src={`${import.meta.env.VITE_API_URL}/uploads/${product.image}`}
                  alt={product.name}
                />
              </div>
              <div className={styles['info-text']}>
                <div className={styles.description}>
                  <div className={styles.title}>Описание товара</div>
                  <p className={styles.text}>{product.description || 'Описание отсутствует'}</p>
                </div>
                <div className={styles.category}>
                  <div className={styles.title}>Категория</div>
                  <p className={styles.text}>{product.category.name}</p>
                </div>
                <div className={styles.manufacturer}>
                  <div className={styles.title}>Производитель</div>
                  <p className={styles.text}>{product.manufacturer.name}</p>
                </div>
                {/* <div className={styles.properties}>
                  <div className={styles.title}>Характеристики</div>
                  {product.productProperties.length ? (
                    product.productProperties.map((property) => (
                      <div className={styles.item}>
                        {property.name} - {property.description}
                      </div>
                    ))
                  ) : (
                    <p>Характеристики отсутствуют</p>
                  )}
                </div> */}
              </div>
            </div>
            <div className={styles.col}>
              <div className={styles.info}>
                <span className={styles.price}>{formatPrice(product.price)}</span>
                <div className={styles.quantity}>
                  <i className={`${styles.icon} fas fa-cubes`}></i>
                  {product.quantity > 0 ? <>{product.quantity} в наличии</> : 'Нет в наличии'}
                </div>
              </div>
              <div className={styles.btns}>
                <Button
                  variant={inCart ? ButtonVariant.secondaryOutlined : ButtonVariant.primary}
                  size={ButtonSize.lg}
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductItemPage;
