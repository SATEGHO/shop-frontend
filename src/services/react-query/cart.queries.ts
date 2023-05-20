import { queryClient } from './index';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CartService } from '../cart.service';
import { toast } from 'react-hot-toast';
import { cartKeysFactory } from './keys.factory';
import { useCartStore } from '@/store/cart.store';

export const useGetItemsCart = () => {
  const setProductsIdsCart = useCartStore((state) => state.setProductsIdsCart);

  return useQuery(cartKeysFactory.cartItems, () => CartService.getAllItems(), {
    onSuccess: (data) => setProductsIdsCart(data.map((item) => item.id)),
  });
};

export const useAddToCart = (productId: string) => {
  const setProductsIdsCart = useCartStore((state) => state.setProductsIdsCart);
  const productsIdsCart = useCartStore((state) => state.productsIdsCart);

  return useMutation(() => CartService.add(productId), {
    onSuccess: () => {
      setProductsIdsCart([...productsIdsCart, productId]);
      toast.success('Товар добавлен в корзину');
    },
  });
};

export const useDeleteFromCart = (itemId: string) => {
  return useMutation(() => CartService.delete(itemId), {
    onSuccess: () => {
      queryClient.invalidateQueries(cartKeysFactory.cartItems);
    },
  });
};

export const useUpdateCartItem = (itemId: string, quantity: number) => {
  return useMutation(() => CartService.update(itemId, quantity), {
    onSuccess: () => {
      queryClient.invalidateQueries(cartKeysFactory.cartItems);
    },
  });
};
