import { CartProduct } from '@models/cart';
import { Product } from '@models/product';
import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';

@Injectable()
export class CartRepository {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async getCartProduct(search: Partial<CartProduct>): Promise<CartProduct> {
    return await this.knex<CartProduct>('cart').where(search).select().first();
  }

  async addProduct(product: Partial<CartProduct>): Promise<void> {
    await this.knex('cart').insert(product);
  }

  async getProductsFromCart(id_cart: string): Promise<Product[]> {
    return await this.knex<Product>('product')
      .select()
      .where('id_cart', id_cart)
      .innerJoin('cart', 'product.id', 'cart.id_product');
  }
}
