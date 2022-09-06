import axios from '../axios';
import { Order } from '@models/order';
import { Product } from '@models/product';

export const getProductsFromOrder = async (
  id_order: string,
): Promise<Product[]> => {
  const response = await axios.get<Product[]>(`/order/${id_order}`);
  return response.data;
};

export const createOrderFromCart = async (id_cart: string): Promise<Order> => {
  const response = await axios.post<Order>(`/order/${id_cart}`);
  return response.data;
};
