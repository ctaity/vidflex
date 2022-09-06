import * as dotenv from 'dotenv';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { validate as isValidUUID } from 'uuid';
import * as client from './client';

dotenv.config();

const UNDEFINED_FN = () => undefined;
const uuidGuard = (value: string | string[]) => {
  const values = [].concat(value);
  values.forEach((v) => {
    if (!isValidUUID(v)) throw new Error(`the value: ${v} is not a valid uuid`);
  });
};

(async () => {
  const parser = yargs(hideBin(process.argv))
    .command(
      'cart_add <id_cart> <id_product>',
      'cart_add id_product to id_cart',
      UNDEFINED_FN,
      async (argv) => {
        const { id_cart, id_product } = argv;
        uuidGuard([id_cart as string, id_product as string]);
        await client.cart.addProduct(id_cart as string, id_product as string);
      },
    )
    .command(
      'cart_get <id_cart>',
      'cart_get id_cart',
      UNDEFINED_FN,
      async (argv) => {
        const { id_cart } = argv;
        uuidGuard(id_cart as string);
        const products = await client.cart.getProducts(id_cart as string);
        console.info(products);
      },
    )
    .command(
      'order_create <id_cart>',
      'create order from id_cart',
      UNDEFINED_FN,
      async (argv) => {
        const { id_cart } = argv;
        uuidGuard(id_cart as string);
        const order = await client.order.createOrderFromCart(id_cart as string);
        console.info(order);
      },
    )
    .command(
      'order_get <id_order>',
      'get products from id_order',
      UNDEFINED_FN,
      async (argv) => {
        const { id_order } = argv;
        uuidGuard(id_order as string);
        const products = await client.order.getProductsFromOrder(
          id_order as string,
        );
        console.info(products);
      },
    )
    .strict()
    .showHelpOnFail(false)
    .demandCommand(1);
  try {
    await parser.parse();
  } catch (err) {
    console.error(`${err.message}`);
  }
})();
