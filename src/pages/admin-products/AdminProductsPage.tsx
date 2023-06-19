import Button from '@/components/ui/button/Button';
import TitlePage from '@/components/ui/title-page/TitlePage';
import { useModalContext } from '@/context/modal/constants';
import { useGetProducts } from '@/services/react-query/product.queries';
import { ButtonVariant } from '@/types/button.types';
import { ModalTypes } from '@/types/modal';
import ProductList from './product-list/ProductList';
import { useState } from 'react';
import { Filter } from '../catalog/CatalogPage';

const AdminProductsPage = () => {
  const [filter] = useState<Filter>({
    catalogFilter: '',
    sortFilter: '',
    categoriesFilter: [],
    manufacturersFilter: [],
  });
  const { setOpen, setModal } = useModalContext();
  const { data } = useGetProducts(filter, '');

  const onAdd = () => {
    setModal(ModalTypes.CREATE_PRODUCT);
    setOpen(true);
  };

  return (
    <div>
      <TitlePage>Товары</TitlePage>
      <Button variant={ButtonVariant.blue} style={{ margin: '20px 0' }} onClick={onAdd}>
        Добавить товар
      </Button>
      {data && <ProductList products={data.products} />}
    </div>
  );
};

export default AdminProductsPage;
