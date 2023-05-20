import { $authhost } from '.';
import { IProduct } from '@/types/product.interface';
import { ICreateProductData } from '@/types/product.requests';

export interface ResponseProducts {
  productsIdsCart: string[];
  products: IProduct[];
}

export const ProductService = {
  async getAll(query?: string): Promise<ResponseProducts> {
    const { data } = await $authhost.get<ResponseProducts>(`/products?query=${query || ''}`);
    return data;
  },

  async getById(id: string): Promise<IProduct> {
    const { data } = await $authhost.get<IProduct>(`/products/${id}`);
    return data;
  },

  async create(data: ICreateProductData) {
    const response = await $authhost.post('/products', data);
    return response.data;
  },
};
