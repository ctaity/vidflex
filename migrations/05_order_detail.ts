import { Knex } from 'knex';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex: Knex): Promise<void> {
  await knex.schema.createTable('order_detail', (table) => {
    table.uuid('id').notNullable().primary();
    table.uuid('id_order').references('id').inTable('order').index();
    table.uuid('id_product').index();
    table.json('product_detail').notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex: Knex): Promise<void> {
  await knex.schema.dropTable('order_detail');
};
