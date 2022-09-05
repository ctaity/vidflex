import { Knex } from 'knex';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex: Knex): Promise<void> {
  await knex.schema.createTable('product', (table) => {
    table.uuid('id').notNullable().primary();
    table.string('label', 200).notNullable();
    table.enu('type', ['physical', 'digital']).notNullable();
    table.string('download_url', 200);
    table.float('weight');
    table.uuid('id_category').references('id').inTable('category');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex: Knex): Promise<void> {
  await knex.schema.dropTable('product');
};
