import { ModalTypes } from '@/types/modal';
import { useModalContext } from '@/context/modal/constants';
import Modal from '@/components/modal/Modal';
import styles from './ModalCreateManufacturer.module.scss';
import Label from '@/components/ui/label/Label';
import Input from '@/components/ui/input/Input';
import Button from '@/components/ui/button/Button';
import { ButtonVariant } from '@/types/button.types';
import { useState } from 'react';
import Error from '@/components/ui/error/Error';
import { useCreateManufacturer } from '@/services/react-query/manufacturer.queries';
import { ProductCatalogTypes } from '../modal-create-product/ModalCreateProduct';

const ModalCreateManufacturer = () => {
  const { modal, open, setOpen } = useModalContext();
  const [name, setName] = useState('');
  const [catalog, setCatalog] = useState('');

  const onClose = () => {
    setOpen(false);
    setName('');
    setCatalog('');
  };

  const { mutate, isLoading, error } = useCreateManufacturer(name, catalog, onClose);

  const onAdd = () => {
    if (name) {
      mutate();
    }
  };

  return (
    <Modal
      title={'Добавить производителя'}
      onClose={onClose}
      open={open && modal === ModalTypes.CREATE_MANUFACTURER}
      style={{ width: 340 }}>
      <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
        <div className={styles.group}>
          <Label htmlFor="name">Название</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Название производителя"
          />
        </div>
        <div className={styles.group}>
          <Label htmlFor="catalog">К какому типу товаров</Label>
          <select
            className={styles.select}
            value={catalog}
            onChange={(e) => setCatalog(e.target.value)}>
            <option disabled value="">
              Выберите тип товара
            </option>
            <option value={ProductCatalogTypes.APPLIANCES}>Бытовая техника</option>
            <option value={ProductCatalogTypes.BUILDING_MATERIALS}>Стройматериалы</option>
          </select>
        </div>
        {error && (
          <Error style={{ marginBottom: 20 }}>
            {error.response?.data?.message ?? error.message}
          </Error>
        )}
        <Button variant={ButtonVariant.blue} onClick={onAdd} disabled={isLoading}>
          Добавить
        </Button>
      </form>
    </Modal>
  );
};

export default ModalCreateManufacturer;
