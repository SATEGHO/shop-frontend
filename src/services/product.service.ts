import { Filter } from '@/pages/catalog/CatalogPage';
import { $authhost } from '.';
import { IProduct } from '@/types/product.interface';
import { ICreateProductData, IUpdateProductData } from '@/types/product.requests';

export interface ResponseProducts {
  productsIdsCart: string[];
  products: IProduct[];
}

export const ProductService = {
  async getAll(filter: Filter, query: string): Promise<ResponseProducts> {
    const { data } = await $authhost.get<ResponseProducts>(`/products`, {
      params: { ...filter, query },
    });
    return data;
  },

  async getById(id: string): Promise<IProduct> {
    const { data } = await $authhost.get<IProduct>(`/products/${id}`);
    return data;
  },

  async create(data: ICreateProductData) {
    const formData = new FormData();

    for (const arr of Object.entries(data)) {
      formData.append(arr[0], arr[1]);
    }

    const response = await $authhost.post('/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async update(id: string, data: IUpdateProductData) {
    const formData = new FormData();

    for (const arr of Object.entries(data)) {
      formData.append(arr[0], arr[1]);
    }

    const response = await $authhost.patch(`/products/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async delete(id: string) {
    const response = await $authhost.delete(`/products/${id}`);
    return response.data;
  },
};
