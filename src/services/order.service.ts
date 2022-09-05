import { Order } from '@models/order';
import { Product } from '@models/product';

export interface OrderService {
  getProductsFromOrder: (id_order: string) => Promise<Product[]>;
  createOrderFromCart: (id_cart: string) => Promise<Order>;
}
