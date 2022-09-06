import axios from '../axios';
import { Product } from '@models/product';

export const addProduct = async (
  id_cart: string,
  id_product: string,
): Promise<void> => {
  axios.post(`/cart/${id_cart}/products/${id_product}`);
};

export const getProducts = async (id_cart: string): Promise<Product[]> => {
  const products = await axios.get<Product[]>(`/cart/${id_cart}`);
  return products.data;
};
