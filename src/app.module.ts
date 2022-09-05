import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { KnexModule } from 'nest-knexjs';
import { CartController } from '@controllers/cart.controller';
import { OrderController } from '@controllers/order.controller';
import { CartServiceDefaultImp } from '@services/cart.service.imp';
import { OrderServiceDefaultImp } from '@services/order.service.imp';
import { ProductRepository } from '@repositories/products.repository';
import { CartRepository } from '@repositories/cart.repository';
import { OrderRepository } from '@repositories/orders.repository';
dotenv.config();

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: 'postgresql',
        connection: {
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
        },
      },
    }),
  ],
  controllers: [CartController, OrderController],
  providers: [
    {
      provide: 'CartService',
      useClass: CartServiceDefaultImp,
    },
    {
      provide: 'OrderService',
      useClass: OrderServiceDefaultImp,
    },
    ProductRepository,
    CartRepository,
    OrderRepository,
  ],
})
export class AppModule {}
