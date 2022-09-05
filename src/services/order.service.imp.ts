import { Product } from 'models/product';
import { OrderService } from '@services/order.service';
import {
  Injectable,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import { OrderRepository } from '@repositories/orders.repository';
import { CartRepository } from '@repositories/cart.repository';

@Injectable()
export class OrderServiceDefaultImp implements OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly cartRepository: CartRepository,
  ) {}

  async getProductsFromOrder(id_order: string): Promise<Product[]> {
    if (!(await this.orderRepository.getOrderById(id_order)))
      throw new NotFoundException(`the order id:${id_order} doesn't exists`);

    const order_detail = await this.orderRepository.getOrderDetailByOrderId(
      id_order,
    );
    return order_detail.map((detail) => detail.product_detail);
  }

  async createOrderFromCart(): Promise<void> {
    const products = await this.cartRepository.getProductsFromCart();
    if (!products.length)
      throw new PreconditionFailedException(`the cart doesn't have products`);
    await this.orderRepository.createOrderWithProducts(products);
  }
}
