import { FC } from 'react';
import styles from './Header.module.scss';
import logo from '@/assets/logo.webp';
import HeaderButton from './ui/header-button/HeaderButton';
import { useModalContext } from '@/context/modal/constants';
import { ModalTypes } from '@/types/modal';
import { useUserStore } from '@/store/user.store';
import { useCartStore } from '@/store/cart.store';
import { useNavigate } from 'react-router-dom';
import Menu from './ui/menu/Menu';
import { Link } from 'react-router-dom';
import Button from '../ui/button/Button';
import { ButtonSize, ButtonVariant } from '@/types/button.types';

const Header: FC = () => {
  const { setOpen, setModal } = useModalContext();
  const push = useNavigate();
  const user = useUserStore((state) => state.user);
  const productsIdsCart = useCartStore((state) => state.productsIdsCart);

  const onAuth = () => {
    setModal(ModalTypes.AUTH);
    setOpen(true);
  };

  return (
    <header className={styles.header}>
      <div className={styles.body}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className={styles.logo} onClick={() => push('/products')}>
            <img src={logo} alt="Logo image" className={styles.img} />
          </div>
          <Link to="/products">
            <Button size={ButtonSize.lg} variant={ButtonVariant.primary}>
              <i className="fa-regular fa-grid-2" style={{ marginRight: 10, fontSize: 17 }}></i>
              Товары
            </Button>
          </Link>
        </div>
        <div className={styles.burger}>
          <span></span>
        </div>
        <div className={styles.items}>
          {user ? (
            <>
              {user.roles.includes('ADMIN') && (
                <HeaderButton icon={'far fa-tools'} onClick={() => push('/admin/products')}>
                  Админ панель
                </HeaderButton>
              )}
              <HeaderButton icon={'fa-sharp fa-regular fa-circle-user'}>
                Профиль
                <Menu />
              </HeaderButton>
              <HeaderButton icon={'far fa-cube'} onClick={() => push('/orders')}>
                Заказы
              </HeaderButton>
            </>
          ) : (
            <HeaderButton icon={'fa-sharp fa-regular fa-circle-user'} onClick={onAuth}>
              Войти
            </HeaderButton>
          )}
          <HeaderButton icon={'fa-regular fa-cart-shopping'} onClick={() => push('/cart')}>
            Корзина{' '}
            {productsIdsCart.length > 0 ? (
              <span className={styles.count}>{productsIdsCart.length}</span>
            ) : null}
          </HeaderButton>
        </div>
      </div>
    </header>
  );
};

export default Header;
