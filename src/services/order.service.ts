import { Product } from '@models/product';

export interface OrderService {
  getProductsFromOrder: (id_order: string) => Promise<Product[]>;
  createOrderFromCart: () => Promise<void>;
}
