import { Knex } from 'knex';
import { faker } from '@faker-js/faker';

const NUMBER_OF_CATEGORIES = 500;

exports.seed = async function (knex: Knex): Promise<void> {
  const categories = Array.from({ length: NUMBER_OF_CATEGORIES }).map(() => {
    return {
      id: faker.datatype.uuid(),
      parent: null,
      label: faker.commerce.department(),
    };
  });

  await knex('category').insert(categories);
};
