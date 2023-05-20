import { IProduct } from '@/types/product.interface';
import { FC } from 'react';
import ProductItem from './product-item/ProductItem';
import styles from './ProductList.module.scss';

interface Props {
  products: IProduct[];
  productsIdsCart: string[];
}

const ProductList: FC<Props> = ({ products, productsIdsCart }) => {
  return (
    <div className={styles.list}>
      {products.map((product) => (
        <ProductItem
          product={product}
          key={product.id}
          inCart={productsIdsCart.includes(product.id)}
        />
      ))}
    </div>
  );
};

export default ProductList;
