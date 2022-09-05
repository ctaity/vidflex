import { Knex } from 'knex';
import { faker } from '@faker-js/faker';

const NUMBER_OF_PRODUCTS = 5000;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function physical(categs) {
  return {
    id: faker.datatype.uuid(),
    label: faker.commerce.productName(),
    type: 'physical',
    id_category: categs[getRandomInt(categs.length)].id,
    weight: faker.datatype.float(),
  };
}

function digital(categs) {
  return {
    id: faker.datatype.uuid(),
    label: faker.commerce.productName(),
    type: 'digital',
    id_category: categs[getRandomInt(categs.length)].id,
    download_url: faker.internet.url(),
  };
}

exports.seed = async function (knex: Knex): Promise<void> {
  const categories = await knex('category').select();
  const products = Array.from({ length: NUMBER_OF_PRODUCTS }).map(() => {
    const digitalOrPhysical = Math.random() < 0.5;
    return digitalOrPhysical ? digital(categories) : physical(categories);
  });
  await knex('product').insert(products);
};
