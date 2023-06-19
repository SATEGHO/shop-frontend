import { useDeleteManufacturer } from '@/services/react-query/manufacturer.queries';
import { IManufacturer } from '@/types/manufacturer.interface';
import { FC } from 'react';
import styles from './ManufacturerItem.module.scss';
import { formatDate } from '@/utils/formatDate';

interface Props {
  manufacturer: IManufacturer;
}

const ManufacturerItem: FC<Props> = ({ manufacturer }) => {
  const { mutate, isLoading } = useDeleteManufacturer(manufacturer.id);

  return (
    <div className={styles.category}>
      <div className={styles.cols}>
        <div className={`${styles.col} ${styles['col-1']}`}>{manufacturer.name}</div>
        <div className={`${styles.col} ${styles['col-2']}`}>
          {manufacturer.catalog === 'appliances' ? 'Бытовая техника' : 'Стройматериалы'}
        </div>
        <div className={`${styles.col} ${styles['col-3']}`}>
          {formatDate(manufacturer.createdAt)}
        </div>
        <div className={`${styles.col} ${styles['col-4']}`}>
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

export default ManufacturerItem;
