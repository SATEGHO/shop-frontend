import { useMutation, useQuery } from '@tanstack/react-query';
import { productKeysFactory } from './keys.factory';
import { ProductService } from '../product.service';
import { useCartStore } from '@/store/cart.store';
import { ICreateProductData } from '@/types/product.requests';
import { toast } from 'react-hot-toast';
import { queryClient } from '.';

export const useGetProducts = (query?: string) => {
  const setProductsIdsCart = useCartStore((state) => state.setProductsIdsCart);

  return useQuery([...productKeysFactory.products, query], () => ProductService.getAll(query), {
    onSuccess: (data) => setProductsIdsCart(data.productsIdsCart),
  });
};

export const useGetProductById = (id: string) => {
  return useQuery(productKeysFactory.details(id), () => ProductService.getById(id));
};

type Handler = () => void;

export const useCreateProduct = (data: ICreateProductData, cb?: Handler) => {
  return useMutation(() => ProductService.create(data), {
    onSuccess: () => {
      if (cb) {
        cb();
      }
      queryClient.invalidateQueries(productKeysFactory.products);
      toast.success('Товар добавлен');
    },
    onError: (err: any) => err,
  });
};
