import { Product } from '@models/product';
import { OrderService } from '@services/order.service';
import {
  Injectable,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import { OrderRepository } from '@repositories/orders.repository';
import { CartRepository } from '@repositories/cart.repository';
import { Order } from '@models/order';

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

  async createOrderFromCart(id_cart: string): Promise<Order> {
    const products = await this.cartRepository.getProductsFromCart(id_cart);
    if (!products.length)
      throw new PreconditionFailedException(
        `the cart is empty or doesn't exists`,
      );
    return await this.orderRepository.createOrderWithProducts(products);
  }
}
