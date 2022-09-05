import { CartProduct } from '@models/cart';

export function productIdToCartProduct(
  id_cart: string,
  id_product: string,
): Partial<CartProduct> {
  return {
    id_cart,
    id_product,
  };
}
