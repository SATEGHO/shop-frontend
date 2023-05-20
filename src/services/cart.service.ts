import { ICartItem } from '@/types/cart-item.interface';
import { $authhost } from '.';

export const CartService = {
  async add(productId: string) {
    const { data } = await $authhost.post('/cart/add', { productId });
    return data;
  },

  async delete(id: string) {
    const { data } = await $authhost.post('/cart/delete', { id });
    return data;
  },

  async update(id: string, quantity: number) {
    const { data } = await $authhost.patch('/cart/update', { id, quantity });
    return data;
  },

  async getAllItems(): Promise<ICartItem[]> {
    const { data } = await $authhost.get<ICartItem[]>('/cart');
    return data;
  },
};
