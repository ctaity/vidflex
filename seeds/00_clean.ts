import { Knex } from 'knex';

exports.seed = async function (knex: Knex): Promise<void> {
  await knex('product').del();
  await knex('category').del();
};
