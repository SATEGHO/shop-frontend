import { IProduct } from '@/types/product.interface';
import { FC } from 'react';
import styles from './ProductItem.module.scss';
import { formatPrice } from '@/utils/formatPrice';

interface Props {
  product: IProduct;
}

const ProductItem: FC<Props> = ({ product }) => {
  return (
    <div className={styles.product}>
      <div className={styles.cols}>
        <div className={`${styles.col} ${styles['col-1']}`}>
          <div className={styles['img-wrapper']}>
            <img src={product.image} alt={product.name} className={styles.img} />
          </div>
        </div>
        <div className={`${styles.col} ${styles['col-2']}`}>{product.name}</div>
        <div className={`${styles.col} ${styles['col-3']}`}>{formatPrice(product.price)}</div>
        <div className={`${styles.col} ${styles['col-4']}`}>{product.quantity}</div>
        <div className={`${styles.col} ${styles['col-5']}`}>{product.category.name}</div>
        <div className={`${styles.col} ${styles['col-6']}`}>{product.manufacturer.name}</div>
        <div className={`${styles.col} ${styles['col-7']}`}>
          <div className={styles.actions}>
            <button className={`${styles.btn} fa-solid fa-pen`}></button>
            <button className={`${styles.btn} fa-solid fa-trash-can`}></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
