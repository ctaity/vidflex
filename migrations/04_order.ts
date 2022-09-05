import { Knex } from 'knex';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex: Knex): Promise<void> {
  await knex.schema.createTable('order', (table) => {
    table.uuid('id').notNullable().primary();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex: Knex): Promise<void> {
  await knex.schema.dropTable('order');
};
