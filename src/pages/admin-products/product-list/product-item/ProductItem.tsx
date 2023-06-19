import { IProduct } from '@/types/product.interface';
import { FC } from 'react';
import styles from './ProductItem.module.scss';
import { formatPrice } from '@/utils/formatPrice';
import { useDeleteProduct } from '@/services/react-query/product.queries';
import { useProductStore } from '@/store/product.store';
import { useModalContext } from '@/context/modal/constants';
import { ModalTypes } from '@/types/modal';

interface Props {
  product: IProduct;
}

const ProductItem: FC<Props> = ({ product }) => {
  const setUpdateProduct = useProductStore((state) => state.setUpdateProduct);
  const { mutate: fetchDeleteProduct, isLoading: isLoadingDelete } = useDeleteProduct();
  const { setOpen, setModal } = useModalContext();

  const onEdit = () => {
    setUpdateProduct(product);
    setModal(ModalTypes.EDIT_PRODUCT);
    setOpen(true);
  };

  return (
    <div className={styles.product}>
      <div className={styles.cols}>
        <div className={`${styles.col} ${styles['col-1']}`}>
          <div className={styles['img-wrapper']}>
            <img
              src={`${import.meta.env.VITE_API_URL}/uploads/${product.image}`}
              alt={product.name}
              className={styles.img}
            />
          </div>
        </div>
        <div className={`${styles.col} ${styles['col-2']}`}>{product.name}</div>
        <div className={`${styles.col} ${styles['col-3']}`}>{formatPrice(product.price)}</div>
        <div className={`${styles.col} ${styles['col-4']}`}>{product.quantity}</div>
        <div className={`${styles.col} ${styles['col-5']}`}>{product.category.name}</div>
        <div className={`${styles.col} ${styles['col-6']}`}>{product.manufacturer.name}</div>
        <div className={`${styles.col} ${styles['col-7']}`}>
          <div className={styles.actions}>
            <button
              className={`${styles.btn} fa-solid fa-pen`}
              disabled={isLoadingDelete}
              onClick={onEdit}></button>
            <button
              className={`${styles.btn} fa-solid fa-trash-can`}
              disabled={isLoadingDelete}
              onClick={() => fetchDeleteProduct(product.id)}></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
