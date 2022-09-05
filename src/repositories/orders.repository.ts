import { Order, OrderDetail } from '@models/order';
import { Product } from '@models/product';
import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrderRepository {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async getOrderById(id: string): Promise<Order> {
    return await this.knex<Order>('order').select().where('id', id).first();
  }

  async getOrderDetailByOrderId(id: string): Promise<OrderDetail[]> {
    return await this.knex<OrderDetail>('order_detail')
      .select()
      .where('id_order', id);
  }

  async createOrderWithProducts(products: Product[]): Promise<Order> {
    const id_order = uuidv4();
    const trx = await this.knex.transaction();
    try {
      const order = await trx<Order>('order')
        .insert({ id: id_order })
        .returning('*');
      const order_detail: Partial<OrderDetail>[] = products.map((p) => {
        return {
          id: uuidv4(),
          id_order,
          id_product: p.id,
          product_detail: p,
        };
      });
      await trx('order_detail').insert(order_detail);
      await trx.commit();
      return order[0];
    } catch (e) {
      await trx.rollback();
      throw e;
    }
  }
}
