import { IProduct } from '@/types/product.interface';
import { FC } from 'react';
import styles from './ProductList.module.scss';
import ProductItem from './product-item/ProductItem';

interface Props {
  products: IProduct[];
}

const ProductList: FC<Props> = ({ products }) => {
  return (
    <div className={styles.list}>
      <div className={styles.header}>
        <div className={styles.cols}>
          <div className={`${styles.col} ${styles['col-1']}`}>Изображение</div>
          <div className={`${styles.col} ${styles['col-2']}`}>Название</div>
          <div className={`${styles.col} ${styles['col-3']}`}>Цена</div>
          <div className={`${styles.col} ${styles['col-4']}`}>В наличии</div>
          <div className={`${styles.col} ${styles['col-5']}`}>Категория</div>
          <div className={`${styles.col} ${styles['col-6']}`}>Производитель</div>
          <div className={`${styles.col} ${styles['col-7']}`}>Действия</div>
        </div>
      </div>
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductList;
