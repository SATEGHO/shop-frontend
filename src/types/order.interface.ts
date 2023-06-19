import { IProduct } from './product.interface';

export enum OrderStates {
  PENDING = 'PENDING',
  CANCELED = 'CANCELED',
  FINISHED = 'FINISHED',
}

export interface IOrderItem {
  id: string;
  price: number;
  quantity: number;
  product: IProduct;
}

export interface IOrder {
  id: string;
  price: number;
  createdAt: string;
  status: OrderStates;
  orderItems: IOrderItem[];
}
