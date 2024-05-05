import { PrismaClient } from '@prisma/client';
import { beforeEach } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';

beforeEach(() => {
  mockReset(prisma);
});

// 3
const prisma = mockDeep<PrismaClient>();
export default prisma;
