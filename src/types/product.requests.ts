export interface ICreateProductData {
  name: string;
  price: any;
  file: File | undefined;
  description: string;
  quantity: any;
  categoryId: string;
  manufacturerId: string;
}

export interface IUpdateProductData {
  id: string;
  name: string;
  price: any;
  file: File | string;
  description: string;
  quantity: any;
  categoryId: string;
  manufacturerId: string;
}
