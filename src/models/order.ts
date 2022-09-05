import { Product } from './product';

export interface Order {
  id: string;
  created_at: Date;
  updated_at: Date;
}

export interface OrderDetail {
  id: string;
  id_order: string;
  id_product: string;
  product_detail: Product;
  created_at: Date;
  updated_at: Date;
}
