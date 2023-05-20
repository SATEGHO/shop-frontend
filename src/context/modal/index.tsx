import { RootTypeModals } from '@/types/modal';
import { FC, useState } from 'react';
import { ModalContext } from './constants';

interface Props {
  children: JSX.Element;
}

export const ModalProvider: FC<Props> = ({ children }) => {
  const [modal, setModal] = useState<RootTypeModals | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <ModalContext.Provider value={{ open, setOpen, modal, setModal }}>
      {children}
    </ModalContext.Provider>
  );
};
