import AdminCategoriesPage from '@/pages/admin-categories/AdminCategoriesPage';
import AdminManufacturersPage from '@/pages/admin-manufacturers/AdminManufacturersPage';
import AdminProductsPage from '@/pages/admin-products/AdminProductsPage';
import CartPage from '@/pages/cart/CartPage';
import CatalogPage from '@/pages/catalog/CatalogPage';
import HomePage from '@/pages/home/HomePage';
import ProductItemPage from '@/pages/product-item/ProductItemPage';
import { RouteObject } from 'react-router-dom';

export const publicRoutes: RouteObject[] = [
  { path: 'cart', element: <CartPage /> },
  { path: 'products', index: true, element: <CatalogPage /> },
  { path: 'products/:id', element: <ProductItemPage /> },
  { path: '/', element: <HomePage /> },
];

export const privateRoutes: RouteObject[] = [{ path: 'profile', element: <CatalogPage /> }];
export const adminRoutes: RouteObject[] = [
  { path: 'products', index: true, element: <AdminProductsPage /> },
  { path: 'categories', element: <AdminCategoriesPage /> },
  { path: 'manufacturers', element: <AdminManufacturersPage /> },
];
