import { test, expect } from 'vitest';
import prisma from '../../src/prisma';

test('Ensure Prisma Singleton contains note schema', async () => {
  expect(prisma).toHaveProperty('note');
});

test('Ensure Prisma Singleton contains note schema', async () => {
  expect(prisma).toHaveProperty('user');
});
