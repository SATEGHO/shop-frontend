import { IManufacturer } from '@/types/manufacturer.interface';
import { $authhost } from '.';

export const ManufacturerService = {
  async getAll(): Promise<IManufacturer[]> {
    const { data } = await $authhost.get<IManufacturer[]>('/manufacturers');
    return data;
  },

  async create(name: string) {
    const { data } = await $authhost.post('/manufacturers', { name });
    return data;
  },

  async delete(id: string) {
    const { data } = await $authhost.delete(`/manufacturers/${id}`);
    return data;
  },
};
