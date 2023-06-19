import { useMutation, useQuery } from '@tanstack/react-query';
import { categoryKeysFactory } from './keys.factory';
import { CategoryService } from '../category.service';
import { queryClient } from '.';
import { toast } from 'react-hot-toast';

export const useGetCategories = (catalogFilter?: string) => {
  return useQuery([...categoryKeysFactory.categories, catalogFilter], () =>
    CategoryService.getAll(catalogFilter),
  );
};

type Handler = () => void;

export const useCreateCategory = (name: string, catalog: string, cb?: Handler) => {
  return useMutation(() => CategoryService.create(name, catalog), {
    onSuccess: () => {
      if (cb) {
        cb();
      }
      queryClient.invalidateQueries(categoryKeysFactory.categories);
      toast.success('Категория добавлена');
    },
    onError: (err: any) => err,
  });
};

export const useDeleteCategory = (id: string) => {
  return useMutation(() => CategoryService.delete(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(categoryKeysFactory.categories);
      toast.success('Категория удалена');
    },
    onError: (_: any) => toast.error('Не удалось удалить категорию'),
  });
};
