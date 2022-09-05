import { CartProduct } from '@models/cart';

export function productIdToCartProduct(id: string): Partial<CartProduct> {
  return { id_product: id };
}
