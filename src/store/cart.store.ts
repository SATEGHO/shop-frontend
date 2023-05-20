import { create } from 'zustand';

interface CartState {
  productsIdsCart: string[];
  setProductsIdsCart: (ids: string[]) => void;
}

export const useCartStore = create<CartState>((set) => ({
  productsIdsCart: [],
  setProductsIdsCart: (ids: string[]) => set(() => ({ productsIdsCart: ids })),
}));
