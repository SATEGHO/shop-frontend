import ProductList from '@/components/product-list/ProductList';
import TitlePage from '@/components/ui/title-page/TitlePage';
import { useGetProducts } from '@/services/react-query/product.queries';
import styles from './CatalogPage.module.scss';
import { useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { useCartStore } from '@/store/cart.store';

const CatalogPage = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const productsIdsCart = useCartStore((state) => state.productsIdsCart);

  const { data } = useGetProducts(debouncedSearch);

  return (
    <div>
      <TitlePage>Товары</TitlePage>
      <div className={styles.search}>
        <div className={styles.body}>
          <div className={styles.container}>
            <i className={`${styles.icon} fa-light fa-magnifying-glass`}></i>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.input}
              placeholder="Поиск по товарам"
            />
          </div>
        </div>
      </div>
      {data && <ProductList products={data.products} productsIdsCart={productsIdsCart} />}
    </div>
  );
};

export default CatalogPage;
