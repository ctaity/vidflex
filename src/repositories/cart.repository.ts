import { CartProduct } from '@models/cart';
import { Product } from '@models/product';
import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';

@Injectable()
export class CartRepository {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async getCartProduct(id: string): Promise<CartProduct> {
    return await this.knex<CartProduct>('cart')
      .where('id_product', id)
      .select()
      .first();
  }

  async addProduct(product: Partial<CartProduct>): Promise<void> {
    await this.knex('cart').insert(product);
  }

  async getProductsFromCart(): Promise<Product[]> {
    return await this.knex<Product>('product')
      .select()
      .innerJoin('cart', 'product.id', 'cart.id_product');
  }
}
