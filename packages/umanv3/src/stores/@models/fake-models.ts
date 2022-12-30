import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

export interface Item {
  id: string;
  proprio: string;
  appartement: string;
  numero: number;
  createdAt?: Date;
  deletedAt?: Date;
}

export function generateFakeData(): Item {
  return {
    id: uuidv4(),
    proprio: faker.lorem.words(),
    appartement: faker.lorem.words(),
    numero: Math.random(),
    createdAt: new Date()
  };
}