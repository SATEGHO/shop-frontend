import { IProduct } from '@/types/product.interface';
import { create } from 'zustand';

interface ProductState {
  updateProduct: IProduct | null;
  setUpdateProduct: (product: IProduct | null) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  updateProduct: null,
  setUpdateProduct: (product: IProduct | null) => set(() => ({ updateProduct: product })),
}));
