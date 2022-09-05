import { Product } from 'models/product';
import { CartService } from './cart.service';
import {
  Injectable,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import { ProductRepository } from '@repositories/products.repository';
import { CartRepository } from '@repositories/cart.repository';
import { CartProduct } from '@models/cart';

@Injectable()
export class CartServiceDefaultImp implements CartService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly cartRepository: CartRepository,
  ) {}

  async getProducts(): Promise<Product[]> {
    return await this.cartRepository.getProductsFromCart();
  }

  async addProduct(cart_product: Partial<CartProduct>): Promise<void> {
    const { id_product } = cart_product;
    if (!(await this.productRepository.findProductById(id_product)))
      throw new NotFoundException(
        `the product id:${id_product} doesn't exists`,
      );

    if (await this.cartRepository.getCartProduct(id_product))
      throw new PreconditionFailedException(
        `the product id:${id_product} is in the cart`,
      );
    await this.cartRepository.addProduct(cart_product);
  }
}
