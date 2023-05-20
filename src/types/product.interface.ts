import { ICategory } from './category.interface';
import { IManufacturer } from './manufacturer.interface';

interface IProductProperty {
  id: string;
  name: string;
  description: string;
  productId: string;
}

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  productProperties: IProductProperty[];
  createdAt: string;
  category: ICategory;
  manufacturer: IManufacturer;
}
