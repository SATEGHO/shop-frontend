import { ICategory } from '@/types/category.interface';
import styles from './CategoryList.module.scss';
import { FC } from 'react';
import CategoryItem from './category-item/CategoryItem';

interface Props {
  categories: ICategory[];
}

const CategoryList: FC<Props> = ({ categories }) => {
  return (
    <div className={styles.list}>
      <div className={styles.header}>
        <div className={styles.cols}>
          <div className={`${styles.col} ${styles['col-1']}`}>Название</div>
          <div className={`${styles.col} ${styles['col-2']}`}>Типы товаров</div>
          <div className={`${styles.col} ${styles['col-3']}`}>Дата создания</div>
          <div className={`${styles.col} ${styles['col-4']}`}>Действия</div>
        </div>
      </div>
      {categories.map((category) => (
        <CategoryItem category={category} key={category.id} />
      ))}
    </div>
  );
};

export default CategoryList;
