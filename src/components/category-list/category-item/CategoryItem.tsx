import { ICategory } from '@/types/category.interface';
import { FC } from 'react';
import styles from './CategoryItem.module.scss';
import { formatDate } from '@/utils/formatDate';
import { useDeleteCategory } from '@/services/react-query/category.queries';

interface Props {
  category: ICategory;
}

const CategoryItem: FC<Props> = ({ category }) => {
  const { mutate, isLoading } = useDeleteCategory(category.id);

  return (
    <div className={styles.category}>
      <div className={styles.cols}>
        <div className={`${styles.col} ${styles['col-1']}`}>{category.name}</div>
        <div className={`${styles.col} ${styles['col-2']}`}>{formatDate(category.createdAt)}</div>
        <div className={`${styles.col} ${styles['col-3']}`}>
          <div className={styles.actions}>
            <button className={`${styles.btn} fa-solid fa-pen`}></button>
            <button
              className={`${styles.btn} fa-solid fa-trash-can`}
              onClick={() => mutate()}
              disabled={isLoading}></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;
