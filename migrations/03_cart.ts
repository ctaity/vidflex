import { Knex } from 'knex';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex: Knex): Promise<void> {
  await knex.schema.createTable('cart', (table) => {
    table.uuid('id_cart').notNullable();
    table.uuid('id_product').notNullable().references('id').inTable('product');
    table.primary(['id_cart', 'id_product']);
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex: Knex): Promise<void> {
  await knex.schema.dropTable('cart');
};
