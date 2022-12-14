import { Product } from '@models/product';
import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';

@Injectable()
export class ProductRepository {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async findProductById(id_product: string): Promise<Product> {
    return this.knex<Product>('product')
      .select()
      .where('id', id_product)
      .first();
  }

  async findAll(): Promise<Product[]> {
    return this.knex<Product>('product').select();
  }
}
