import { Product } from '@models/product';
import {
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CartService } from '@services/cart.service';
import { productIdToCartProduct } from '@controllers/mappers';

@Controller('cart')
export class CartController {
  constructor(
    @Inject('CartService') private readonly cartService: CartService,
  ) {}

  @Get(':cart_id')
  async getProductsFromCart(
    @Param('cart_id', new ParseUUIDPipe()) cart_id: string,
  ): Promise<Product[]> {
    return await this.cartService.getProducts(cart_id);
  }

  @Post(':cart_id/products/:product_id')
  async addProductToCart(
    @Param('cart_id', new ParseUUIDPipe()) cart_id: string,
    @Param('product_id', new ParseUUIDPipe()) product_id: string,
  ): Promise<void> {
    return await this.cartService.addProduct(
      productIdToCartProduct(cart_id, product_id),
    );
  }
}
