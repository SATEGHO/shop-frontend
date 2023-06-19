import styles from './ManufacturersList.module.scss';
import { FC } from 'react';
import { IManufacturer } from '@/types/manufacturer.interface';
import ManufacturerItem from './manufacturer-item/ManufacturerItem';

interface Props {
  manufacturers: IManufacturer[];
}

const ManufacturersList: FC<Props> = ({ manufacturers }) => {
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
      {manufacturers.map((manufacturer) => (
        <ManufacturerItem manufacturer={manufacturer} key={manufacturer.id} />
      ))}
    </div>
  );
};

export default ManufacturersList;
