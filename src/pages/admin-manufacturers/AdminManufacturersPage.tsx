import ManufacturersList from '@/components/manufacturers-list/ManufacturersList';
import Button from '@/components/ui/button/Button';
import TitlePage from '@/components/ui/title-page/TitlePage';
import { useModalContext } from '@/context/modal/constants';
import { useGetManufacturers } from '@/services/react-query/manufacturer.queries';
import { ButtonVariant } from '@/types/button.types';
import { ModalTypes } from '@/types/modal';

const AdminManufacturersPage = () => {
  const { setOpen, setModal } = useModalContext();
  const { data: manufacturers } = useGetManufacturers();

  const onAdd = () => {
    setModal(ModalTypes.CREATE_MANUFACTURER);
    setOpen(true);
  };

  return (
    <div>
      <TitlePage>Производители</TitlePage>
      <Button variant={ButtonVariant.blue} style={{ margin: '20px 0' }} onClick={onAdd}>
        Добавить производителя
      </Button>
      {manufacturers && <ManufacturersList manufacturers={manufacturers} />}
    </div>
  );
};

export default AdminManufacturersPage;
