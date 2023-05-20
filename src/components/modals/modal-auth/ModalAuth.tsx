import { useState } from 'react';
import { ModalTypes } from '@/types/modal';
import { useModalContext } from '@/context/modal/constants';
import AuthForm from './auth-form/AuthForm';
import Modal from '@/components/modal/Modal';

const ModalAuth = () => {
  const { modal, open, setOpen } = useModalContext();
  const [formType, setFormType] = useState('login');

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      title={formType === 'login' ? 'Авторизация' : 'Регистрация'}
      onClose={onClose}
      open={open && modal === ModalTypes.AUTH}
      style={{ width: 380 }}>
      <AuthForm formType={formType} setFormType={setFormType} onCloseModal={onClose} />
    </Modal>
  );
};

export default ModalAuth;
