import { IOrder } from '@/types/order.interface';
import { $authhost } from '.';

export const OrderService = {
  async create() {
    const response = await $authhost.post('/orders/create');
    return response.data;
  },

  async getAll(): Promise<IOrder[]> {
    const response = await $authhost.get<IOrder[]>('/orders');
    return response.data;
  },
};
