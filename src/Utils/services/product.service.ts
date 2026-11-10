import { axiosInstance } from '../api/axiosInstance';
import type { Product, CreateProductInput } from '../../types/product.types';

export const getProducts = (): Promise<Product[]> => {
  return axiosInstance.get('/products').then((response: { data: Product[] }) => response.data);
};

export const createProduct = (data: CreateProductInput): Promise<Product> => {
  return axiosInstance.post('/products', data).then((response: { data: Product }) => response.data);
};
