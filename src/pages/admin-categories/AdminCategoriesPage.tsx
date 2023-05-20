import CategoryList from '@/components/category-list/CategoryList';
import Button from '@/components/ui/button/Button';
import TitlePage from '@/components/ui/title-page/TitlePage';
import { useModalContext } from '@/context/modal/constants';
import { useGetCategories } from '@/services/react-query/category.queries';
import { ButtonVariant } from '@/types/button.types';
import { ModalTypes } from '@/types/modal';

const AdminCategoriesPage = () => {
  const { setOpen, setModal } = useModalContext();
  const { data: categories } = useGetCategories();

  const onAdd = () => {
    setModal(ModalTypes.CREATE_CATEGORY);
    setOpen(true);
  };

  return (
    <div>
      <TitlePage>Категории</TitlePage>
      <Button variant={ButtonVariant.blue} style={{ margin: '20px 0' }} onClick={onAdd}>
        Добавить категорию
      </Button>
      {categories && <CategoryList categories={categories} />}
    </div>
  );
};

export default AdminCategoriesPage;
