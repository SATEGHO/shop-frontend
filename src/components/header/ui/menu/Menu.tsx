import { useUserStore } from '@/store/user.store';
import styles from './Menu.module.scss';
import { queryClient } from '@/services/react-query';
import { cartKeysFactory, productKeysFactory } from '@/services/react-query/keys.factory';
import { useCartStore } from '@/store/cart.store';

const Menu = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const setProductsIdsCart = useCartStore((state) => state.setProductsIdsCart);

  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
    queryClient.invalidateQueries(productKeysFactory.products);
    queryClient.invalidateQueries(cartKeysFactory.cartItems);
    setProductsIdsCart([]);
  };

  return (
    <div className={styles.menu}>
      <div className={styles.body}>
        <div className={styles.header}>{user?.name}</div>
        <div className={styles.info}>{user?.email}</div>
        <button className={styles.btn} onClick={logout}>
          Выйти
        </button>
      </div>
    </div>
  );
};

export default Menu;
