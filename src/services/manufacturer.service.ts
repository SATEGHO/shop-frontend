import { IManufacturer } from '@/types/manufacturer.interface';
import { $authhost, $host } from '.';

export const ManufacturerService = {
  async getAll(catalogFilter?: string): Promise<IManufacturer[]> {
    const { data } = await $host.get<IManufacturer[]>('/manufacturers', {
      params: { catalogFilter },
    });
    return data;
  },

  async create(name: string, catalog: string) {
    const { data } = await $authhost.post('/manufacturers', { name, catalog });
    return data;
  },

  async delete(id: string) {
    const { data } = await $authhost.delete(`/manufacturers/${id}`);
    return data;
  },
};
