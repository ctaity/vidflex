import { Product } from '@models/product';
import { Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { OrderService } from '@services/order.service';

@Controller('order')
export class OrderController {
  constructor(
    @Inject('OrderService') private readonly orderService: OrderService,
  ) {}

  @Get(':order_id')
  async getProductsFromOrder(
    @Param('order_id') oid: string,
  ): Promise<Product[]> {
    return await this.orderService.getProductsFromOrder(oid);
  }

  @Post()
  async createOrderFromCart(): Promise<void> {
    await this.orderService.createOrderFromCart();
  }
}
