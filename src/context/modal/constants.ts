import { RootTypeModals } from '@/types/modal';
import { createContext, useContext } from 'react';

type ModalContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  modal: RootTypeModals | null;
  setModal: (modal: RootTypeModals) => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);
export const useModalContext = () => useContext(ModalContext) as ModalContextType;
