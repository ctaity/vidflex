import { Order } from '@models/order';
import { Product } from '@models/product';
import {
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { OrderService } from '@services/order.service';

@Controller('order')
export class OrderController {
  constructor(
    @Inject('OrderService') private readonly orderService: OrderService,
  ) {}

  @Get(':id_order')
  async getProductsFromOrder(
    @Param('id_order', new ParseUUIDPipe()) id_order: string,
  ): Promise<Product[]> {
    const products = await this.orderService.getProductsFromOrder(id_order);
    return products;
  }

  @Post(':id_cart')
  async createOrderFromCart(
    @Param('id_cart', new ParseUUIDPipe()) id_cart,
  ): Promise<Order> {
    const order = await this.orderService.createOrderFromCart(id_cart);
    return order;
  }
}
