export const userKeysFactory = {
  checkAuth: ['check-auth'],
  login: ['login'],
  register: ['register'],
} as const;

export const productKeysFactory = {
  products: ['products'],
  details: (id: string) => [...productKeysFactory.products, id],
} as const;

export const cartKeysFactory = {
  cartItems: ['cart-items'],
} as const;

export const categoryKeysFactory = {
  categories: ['categories'],
} as const;

export const manufacturerKeysFactory = {
  manufacturers: ['manufacturers'],
} as const;

export const orderKeysFactory = {
  orders: ['orders'],
} as const;
