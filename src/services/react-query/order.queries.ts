import { useMutation, useQuery } from '@tanstack/react-query';
import { OrderService } from '../order.service';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '.';
import { cartKeysFactory, orderKeysFactory } from './keys.factory';
import { useCartStore } from '@/store/cart.store';

export const useCreateOrder = () => {
  const push = useNavigate();
  const setProductsIdsCart = useCartStore((state) => state.setProductsIdsCart);

  return useMutation({
    mutationFn: () => OrderService.create(),
    onSuccess: () => {
      toast.success('Заказ создан');
      queryClient.invalidateQueries(orderKeysFactory.orders);
      push('/orders');
      queryClient.invalidateQueries(cartKeysFactory.cartItems);
      setProductsIdsCart([]);
    },
    onError: (err: AxiosError) => err,
  });
};

export const useGetAllOrdersQuuery = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: () => OrderService.getAll(),
    onError: (err: AxiosError) => err,
  });
};
