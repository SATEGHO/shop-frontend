import ProductList from '@/components/product-list/ProductList';
import TitlePage from '@/components/ui/title-page/TitlePage';
import { useGetProducts } from '@/services/react-query/product.queries';
import styles from './CatalogPage.module.scss';
import { useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { useCartStore } from '@/store/cart.store';
import { useGetCategories } from '@/services/react-query/category.queries';
import Checkbox from '@/components/ui/checkbox/Checkbox';
import { useGetManufacturers } from '@/services/react-query/manufacturer.queries';
import Loader from '@/components/ui/loader/Loader';

enum Catalog {
  ALL = '',
  APPLIANCES = 'appliances',
  BUILDING_MATERIALS = 'building_materials',
}

export type Filter = {
  catalogFilter: string;
  sortFilter: string;
  categoriesFilter: string[];
  manufacturersFilter: string[];
};

const CatalogPage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>({
    catalogFilter: '',
    sortFilter: '',
    categoriesFilter: [],
    manufacturersFilter: [],
  });
  const debouncedSearch = useDebounce(query, 300);
  const productsIdsCart = useCartStore((state) => state.productsIdsCart);
  const { data: categories, isLoading: isFetchingCategories } = useGetCategories(
    filter.catalogFilter,
  );
  const { data: manufacturers, isLoading: isFetchingManufacturers } = useGetManufacturers(
    filter.catalogFilter,
  );

  const { data: dataProducts, isLoading: isFetchingProducts } = useGetProducts(
    filter,
    debouncedSearch,
  );

  const onChangeCategory = (categoryId: string, isChecked: boolean) => {
    if (isChecked) {
      setFilter({ ...filter, categoriesFilter: [...filter.categoriesFilter, categoryId] });
    } else {
      setFilter({
        ...filter,
        categoriesFilter: filter.categoriesFilter.filter((id) => id !== categoryId),
      });
    }
  };

  const onChangeManufacturer = (manufacturerId: string, isChecked: boolean) => {
    if (isChecked) {
      setFilter({
        ...filter,
        manufacturersFilter: [...filter.manufacturersFilter, manufacturerId],
      });
    } else {
      setFilter({
        ...filter,
        manufacturersFilter: filter.manufacturersFilter.filter((id) => id !== manufacturerId),
      });
    }
  };

  return (
    <div>
      <TitlePage>Товары</TitlePage>
      <div className={styles.cols}>
        <div className={`${styles.col} ${styles['col-1']}`}>
          <div className={styles.filters}>
            <div
              className={styles['filters-title']}
              onClick={() => setShowFilters((prev) => !prev)}>
              <span>Фильтры поиска</span>
              <span>{showFilters ? '-' : '+'}</span>
            </div>
            <div className={`${styles['filters-body']} ${showFilters ? styles.active : ''}`}>
              <div className={styles['filter-item']}>
                <div className={styles['sub-title']}>Типы товаров</div>
                <button
                  className={`${styles['btn-select']} ${
                    filter.catalogFilter === Catalog.ALL ? styles.active : ''
                  }`}
                  onClick={() => setFilter({ ...filter, catalogFilter: Catalog.ALL })}>
                  Все товары
                </button>
                <button
                  className={`${styles['btn-select']} ${
                    filter.catalogFilter === Catalog.APPLIANCES ? styles.active : ''
                  }`}
                  onClick={() => setFilter({ ...filter, catalogFilter: Catalog.APPLIANCES })}>
                  Бытовая техника
                </button>
                <button
                  className={`${styles['btn-select']} ${
                    filter.catalogFilter === Catalog.BUILDING_MATERIALS ? styles.active : ''
                  }`}
                  onClick={() =>
                    setFilter({ ...filter, catalogFilter: Catalog.BUILDING_MATERIALS })
                  }>
                  Стройматериалы
                </button>
              </div>
              <div className={styles['filter-item']}>
                <div className={styles['sub-title']}>Категории</div>
                <div>
                  {isFetchingCategories ? (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                      }}>
                      <Loader size="md" />
                    </div>
                  ) : (
                    categories &&
                    categories.map((category) => (
                      <label
                        htmlFor={`category-${category.id}`}
                        key={category.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: 10,
                          cursor: 'pointer',
                        }}>
                        <Checkbox
                          id={`category-${category.id}`}
                          onChange={(e) => onChangeCategory(category.id, e.target.checked)}
                        />
                        <span style={{ paddingLeft: 10 }}>{category.name}</span>
                      </label>
                    ))
                  )}
                </div>
              </div>
              <div className={styles['filter-item']}>
                <div className={styles['sub-title']}>Производители</div>
                <div>
                  {isFetchingManufacturers ? (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                      }}>
                      <Loader size="md" />
                    </div>
                  ) : (
                    manufacturers &&
                    manufacturers.map((manufacturer) => (
                      <label
                        htmlFor={`category-${manufacturer.id}`}
                        key={manufacturer.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: 10,
                          cursor: 'pointer',
                        }}>
                        <Checkbox
                          id={`category-${manufacturer.id}`}
                          onChange={(e) => onChangeManufacturer(manufacturer.id, e.target.checked)}
                        />
                        <span style={{ paddingLeft: 10 }}>{manufacturer.name}</span>
                      </label>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.col} ${styles['col-2']}`}>
          <div className={styles['search-container']}>
            <div className={styles.search}>
              <div className={styles.body}>
                <div className={styles.container}>
                  <i className={`${styles.icon} fa-light fa-magnifying-glass`}></i>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className={styles.input}
                    placeholder="Поиск по товарам"
                  />
                </div>
              </div>
            </div>
            <div className={styles.filter}>
              <span style={{ marginRight: 10 }}>Сортировка:</span>
              <select
                value={filter.sortFilter}
                onChange={(e) => setFilter({ ...filter, sortFilter: e.target.value })}
                className={styles.select}>
                <option value="">Отсутствует</option>
                <option value="desc">По цене (убыванию)</option>
                <option value="asc">По цене (возрастанию)</option>
              </select>
            </div>
          </div>
          {isFetchingProducts ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}>
              <Loader size="lg" />
            </div>
          ) : dataProducts && dataProducts.products.length ? (
            <ProductList products={dataProducts.products} productsIdsCart={productsIdsCart} />
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}>
              <p style={{ textAlign: 'center', fontSize: 16, color: 'gray' }}>
                Товаров по вашему запросу не найдено
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
