import { CartProduct } from '@models/cart';
import { Product } from '@models/product';

export interface CartService {
  getProducts: () => Promise<Product[]>;
  addProduct: (car_product: Partial<CartProduct>) => Promise<void>;
}
