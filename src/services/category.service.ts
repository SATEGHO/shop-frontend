import { ICategory } from '@/types/category.interface';
import { $authhost, $host } from '.';

export const CategoryService = {
  async getAll(catalogFilter?: string): Promise<ICategory[]> {
    const { data } = await $host.get<ICategory[]>('/categories', {
      params: {
        catalogFilter,
      },
    });
    return data;
  },

  async create(name: string, catalog: string) {
    const { data } = await $authhost.post('/categories', { name, catalog });
    return data;
  },

  async delete(id: string) {
    const { data } = await $authhost.delete(`/categories/${id}`);
    return data;
  },
};
