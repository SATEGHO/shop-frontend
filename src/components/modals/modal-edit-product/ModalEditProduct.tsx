import { useModalContext } from '@/context/modal/constants';
import styles from './ModalEditProduct.module.scss';
import { useGetManufacturers } from '@/services/react-query/manufacturer.queries';
import { useGetCategories } from '@/services/react-query/category.queries';
import { ChangeEvent, useEffect, useState } from 'react';
import { IUpdateProductData } from '@/types/product.requests';
import Modal from '@/components/modal/Modal';
import { ModalTypes } from '@/types/modal';
import Label from '@/components/ui/label/Label';
import Input from '@/components/ui/input/Input';
import Error from '@/components/ui/error/Error';
import Button from '@/components/ui/button/Button';
import { ButtonVariant } from '@/types/button.types';
import { useUpdateProduct } from '@/services/react-query/product.queries';
import { useProductStore } from '@/store/product.store';

export enum ProductCatalogTypes {
  APPLIANCES = 'appliances',
  BUILDING_MATERIALS = 'building_materials',
}

const ModalEditProduct = () => {
  const updateProduct = useProductStore((state) => state.updateProduct);
  const { modal, open, setOpen } = useModalContext();
  const { data: manufacturers } = useGetManufacturers();
  const { data: categories } = useGetCategories();

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log('is changed');
      setForm({ ...form, file: e.target.files[0] });
    }
  };

  const [form, setForm] = useState<IUpdateProductData>({
    id: '',
    name: '',
    price: '',
    file: '',
    description: '',
    quantity: 1,
    categoryId: '',
    manufacturerId: '',
  });

  const onClose = () => {
    setForm({
      id: '',
      name: '',
      price: '',
      file: '',
      description: '',
      quantity: 1,
      categoryId: '',
      manufacturerId: '',
    });
    setOpen(false);
  };

  const { mutate, isLoading, error } = useUpdateProduct(onClose);

  const onAdd = () => {
    mutate({ ...form, price: +form.price, quantity: +form.quantity });
  };

  useEffect(() => {
    if (updateProduct) {
      setForm({
        id: updateProduct.id,
        name: updateProduct.name,
        price: updateProduct.price,
        file: updateProduct.image,
        description: updateProduct.description,
        quantity: updateProduct.quantity,
        categoryId: updateProduct.category.id,
        manufacturerId: updateProduct.manufacturer.id,
      });
    }
  }, [updateProduct]);

  return (
    <Modal
      title={'Редактировать товар'}
      onClose={onClose}
      open={open && modal === ModalTypes.EDIT_PRODUCT}
      style={{ width: 500 }}>
      <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
        <div className={styles.group}>
          <Label htmlFor="name-edit">Название</Label>
          <Input
            id="name-edit"
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Название товара"
          />
        </div>
        <div className={styles.group}>
          <Label htmlFor="price-edit">Цена</Label>
          <Input
            id="price-edit"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            placeholder="Цена товара"
          />
        </div>

        <div className={styles.group}>
          <Label htmlFor="image">Изображение</Label>
          <div className={styles.upload}>
            <label htmlFor="file-edit">
              {form.file ? (
                <span className={styles['file-name']}>
                  {typeof form.file === 'string' ? form.file : form.file.name}
                </span>
              ) : (
                'Выбрать файл'
              )}
            </label>
            <input
              id="file-edit"
              type="file"
              accept=".jpg,.jpeg,.png|image/*"
              onChange={handleChangeFile}
            />
          </div>
        </div>
        <div className={styles.group}>
          <Label htmlFor="body-edit">Описание</Label>
          <Input
            id="body-edit"
            type="text"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Описание"
          />
        </div>
        <div className={styles.group}>
          <Label htmlFor="count-edit">Количество</Label>
          <Input
            id="count-edit"
            type="number"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            placeholder="Количество"
          />
        </div>
        <div className={styles.group}>
          <Label htmlFor="category-edit">Категория</Label>
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
            Сохранить
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalEditProduct;
