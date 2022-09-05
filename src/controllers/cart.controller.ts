import { Product } from 'models/product';
import { Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { CartService } from '@services/cart.service';
import { productIdToCartProduct } from '@controllers/mappers';

@Controller('cart')
export class CartController {
  constructor(
    @Inject('CartService') private readonly cartService: CartService,
  ) {}

  @Get()
  async getProductsFromCart(): Promise<Product[]> {
    return await this.cartService.getProducts();
  }

  @Post('products/:product_id')
  async addProductToCart(@Param('product_id') pid: string): Promise<void> {
    return await this.cartService.addProduct(productIdToCartProduct(pid));
  }
}
