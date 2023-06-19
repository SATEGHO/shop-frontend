import { useMutation, useQuery } from '@tanstack/react-query';
import { manufacturerKeysFactory } from './keys.factory';
import { queryClient } from '.';
import { toast } from 'react-hot-toast';
import { ManufacturerService } from '../manufacturer.service';

export const useGetManufacturers = (catalogFilter?: string) => {
  return useQuery([...manufacturerKeysFactory.manufacturers, catalogFilter], () =>
    ManufacturerService.getAll(catalogFilter),
  );
};

type Handler = () => void;

export const useCreateManufacturer = (name: string, catalog: string, cb?: Handler) => {
  return useMutation(() => ManufacturerService.create(name, catalog), {
    onSuccess: () => {
      if (cb) {
        cb();
      }
      queryClient.invalidateQueries(manufacturerKeysFactory.manufacturers);
      toast.success('Производитель добавлен');
    },
    onError: (err: any) => err,
  });
};

export const useDeleteManufacturer = (id: string) => {
  return useMutation(() => ManufacturerService.delete(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(manufacturerKeysFactory.manufacturers);
      toast.success('Производитель удален');
    },
    onError: (_: any) => toast.error('Не удалось удалить производителя'),
  });
};
