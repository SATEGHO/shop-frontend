import { useMutation, useQuery } from '@tanstack/react-query';
import { productKeysFactory } from './keys.factory';
import { ProductService } from '../product.service';
import { useCartStore } from '@/store/cart.store';
import { ICreateProductData, IUpdateProductData } from '@/types/product.requests';
import { toast } from 'react-hot-toast';
import { queryClient } from '.';
import { AxiosError } from 'axios';
import { errorFormatter } from '@/utils/errorFormatter';
import { Filter } from '@/pages/catalog/CatalogPage';

export const useGetProducts = (filter: Filter, query: string) => {
  const setProductsIdsCart = useCartStore((state) => state.setProductsIdsCart);

  return useQuery({
    queryKey: [...productKeysFactory.products, ...Object.values(filter), query],
    queryFn: () => ProductService.getAll(filter, query),
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

export const useUpdateProduct = (cb?: Handler) => {
  return useMutation({
    mutationFn: (data: IUpdateProductData) => ProductService.update(data.id, data),
    onSuccess: () => {
      if (cb) {
        cb();
      }
      queryClient.invalidateQueries(productKeysFactory.products);
      toast.success('Товар изменен');
    },
    onError: (err: any) => err,
  });
};

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: (id: string) => ProductService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries(productKeysFactory.products);
      toast.success('Товар удален');
    },
    onError: (err: AxiosError) => {
      toast.error(errorFormatter(err));
    },
  });
};
