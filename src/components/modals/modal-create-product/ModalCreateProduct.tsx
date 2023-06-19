import Modal from '@/components/modal/Modal';
import styles from './ModalCreateProduct.module.scss';
import { useModalContext } from '@/context/modal/constants';
import { ModalTypes } from '@/types/modal';
import Label from '@/components/ui/label/Label';
import Input from '@/components/ui/input/Input';
import { ICreateProductData } from '@/types/product.requests';
import { ChangeEvent, useState } from 'react';
import { useGetManufacturers } from '@/services/react-query/manufacturer.queries';
import { useGetCategories } from '@/services/react-query/category.queries';
import Button from '@/components/ui/button/Button';
import { ButtonVariant } from '@/types/button.types';
import { useCreateProduct } from '@/services/react-query/product.queries';
import Error from '@/components/ui/error/Error';

export enum ProductCatalogTypes {
  APPLIANCES = 'appliances',
  BUILDING_MATERIALS = 'building_materials',
}

const ModalCreateProduct = () => {
  const { modal, open, setOpen } = useModalContext();
  const { data: manufacturers } = useGetManufacturers();
  const { data: categories } = useGetCategories();

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('chaned');
    if (e.target.files) {
      setForm({ ...form, file: e.target.files[0] });
      e.target.value = '';
    }
  };

  const [form, setForm] = useState<ICreateProductData>({
    name: '',
    price: '',
    file: undefined,
    description: '',
    quantity: 1,
    categoryId: '',
    manufacturerId: '',
  });

  const onClose = () => {
    setForm({
      name: '',
      price: '',
      file: undefined,
      description: '',
      quantity: 1,
      categoryId: '',
      manufacturerId: '',
    });
    setOpen(false);
  };

  const { mutate, isLoading, error } = useCreateProduct(
    { ...form, price: +form.price, quantity: +form.quantity },
    onClose,
  );

  const onAdd = () => {
    mutate();
  };

  return (
    <Modal
      title={'Добавить товар'}
      onClose={onClose}
      open={open && modal === ModalTypes.CREATE_PRODUCT}
      style={{ width: 500 }}>
      <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
        <div className={styles.group}>
          <Label htmlFor="name">Название</Label>
          <Input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Название товара"
          />
        </div>
        <div className={styles.group}>
          <Label htmlFor="price">Цена</Label>
          <Input
            id="price"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            placeholder="Цена товара"
          />
        </div>

        <div className={styles.group}>
          <Label htmlFor="image">Изображение</Label>
          <div className={styles.upload}>
            <label htmlFor="file">
              {form.file ? (
                <span className={styles['file-name']}>{form.file.name}</span>
              ) : (
                'Выбрать файл'
              )}
            </label>
            <input
              id="file"
              type="file"
              accept=".jpg,.jpeg,.png|image/*"
              onChange={handleChangeFile}
            />
          </div>
        </div>
        <div className={styles.group}>
          <Label htmlFor="body">Описание</Label>
          <Input
            id="body"
            type="text"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Описание"
          />
        </div>
        <div className={styles.group}>
          <Label htmlFor="count">Количество</Label>
          <Input
            id="count"
            type="number"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            placeholder="Количество"
          />
        </div>
        <div className={styles.group}>
          <Label htmlFor="category">Категория</Label>
          {categories && (
            <select
              className={styles.select}
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
              <option disabled value="">
                Выберите категорию
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className={styles.group}>
          <Label htmlFor="manufacturer">Производитель</Label>
          {manufacturers && (
            <select
              className={styles.select}
              value={form.manufacturerId}
              onChange={(e) => setForm({ ...form, manufacturerId: e.target.value })}>
              <option disabled value="">
                Выберите производителя
              </option>
              {manufacturers.map((manufacturer) => (
                <option key={manufacturer.id} value={manufacturer.id}>
                  {manufacturer.name}
                </option>
              ))}
            </select>
          )}
        </div>
        {error && (
          <Error style={{ marginBottom: 20 }}>
            {error.response?.data?.message ?? error.message}
          </Error>
        )}
        <div className={styles.btns}>
          <Button variant={ButtonVariant.blue} onClick={onAdd} disabled={isLoading}>
            Добавить
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalCreateProduct;
