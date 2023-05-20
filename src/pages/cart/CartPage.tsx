import CartInfo from '@/components/cart-info/CartInfo';
import CartList from '@/components/cart-list/CartList';
import { useGetItemsCart } from '@/services/react-query/cart.queries';
import styles from './CartPage.module.scss';
import TitlePage from '@/components/ui/title-page/TitlePage';
import { useUserStore } from '@/store/user.store';
import { ButtonSize, ButtonVariant } from '@/types/button.types';
import Button from '@/components/ui/button/Button';
import { useModalContext } from '@/context/modal/constants';
import { ModalTypes } from '@/types/modal';

const CartPage = () => {
  const { setOpen, setModal } = useModalContext();
  const { data: cartItems } = useGetItemsCart();
  const user = useUserStore((state) => state.user);

  const onAuth = () => {
    setModal(ModalTypes.AUTH);
    setOpen(true);
  };

  return (
    <div>
      <TitlePage>Корзина</TitlePage>
      <div className={styles.container}>
        {!user ? (
          <div style={{ textAlign: 'center', fontSize: 15 }}>
            <div style={{ marginBottom: 15 }}>
              Для того чтобы добавлять товары в корзину, необходимо авторизоваться
            </div>
            <Button variant={ButtonVariant.primary} size={ButtonSize.lg} onClick={onAuth}>
              Войти
            </Button>
          </div>
        ) : cartItems && cartItems.length ? (
          <div className={styles.content}>
            <CartList cartItems={cartItems} />
            <CartInfo cartItems={cartItems} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CartPage;
