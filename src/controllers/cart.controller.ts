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

  @Get(':id_cart')
  async getProductsFromCart(
    @Param('id_cart', new ParseUUIDPipe()) id_cart: string,
  ): Promise<Product[]> {
    return await this.cartService.getProducts(id_cart);
  }

  @Post(':id_cart/products/:id_product')
  async addProductToCart(
    @Param('id_cart', new ParseUUIDPipe()) id_cart: string,
    @Param('id_product', new ParseUUIDPipe()) id_product: string,
  ): Promise<void> {
    return await this.cartService.addProduct(
      productIdToCartProduct(id_cart, id_product),
    );
  }
}
