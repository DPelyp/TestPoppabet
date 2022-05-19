import faker from 'faker';

export const RANDOM_NAME = faker.name.findName();
export const RANDOM_LAST_NAME = faker.name.lastName();
export const RANDOM_EMAIL = faker.internet.email();