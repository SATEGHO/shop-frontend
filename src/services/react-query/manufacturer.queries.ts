import { useMutation, useQuery } from '@tanstack/react-query';
import { manufacturerKeysFactory } from './keys.factory';
import { queryClient } from '.';
import { toast } from 'react-hot-toast';
import { ManufacturerService } from '../manufacturer.service';

export const useGetManufacturers = () => {
  return useQuery(manufacturerKeysFactory.manufacturers, () => ManufacturerService.getAll());
};

type Handler = () => void;

export const useCreateManufacturer = (name: string, cb?: Handler) => {
  return useMutation(() => ManufacturerService.create(name), {
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
