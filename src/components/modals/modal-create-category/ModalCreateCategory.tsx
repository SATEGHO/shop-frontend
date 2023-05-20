import { ModalTypes } from '@/types/modal';
import { useModalContext } from '@/context/modal/constants';
import Modal from '@/components/modal/Modal';
import styles from './ModalCreateCategory.module.scss';
import Label from '@/components/ui/label/Label';
import Input from '@/components/ui/input/Input';
import Button from '@/components/ui/button/Button';
import { ButtonVariant } from '@/types/button.types';
import { useCreateCategory } from '@/services/react-query/category.queries';
import { useState } from 'react';
import Error from '@/components/ui/error/Error';

const ModalCreateCategory = () => {
  const { modal, open, setOpen } = useModalContext();
  const [name, setName] = useState('');

  const onClose = () => {
    setOpen(false);
    setName('');
  };

  const { mutate, isLoading, error } = useCreateCategory(name, onClose);

  const onAdd = () => {
    if (name) {
      mutate();
    }
  };

  return (
    <Modal
      title={'Добавить категорию'}
      onClose={onClose}
      open={open && modal === ModalTypes.CREATE_CATEGORY}
      style={{ width: 340 }}>
      <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
        <div className={styles.group}>
          <Label htmlFor="name">Название</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Название категории"
          />
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

export default ModalCreateCategory;
