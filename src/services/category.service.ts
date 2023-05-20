import { ICategory } from '@/types/category.interface';
import { $authhost } from '.';

export const CategoryService = {
  async getAll(): Promise<ICategory[]> {
    const { data } = await $authhost.get<ICategory[]>('/categories');
    return data;
  },

  async create(name: string) {
    const { data } = await $authhost.post('/categories', { name });
    return data;
  },

  async delete(id: string) {
    const { data } = await $authhost.delete(`/categories/${id}`);
    return data;
  },
};
