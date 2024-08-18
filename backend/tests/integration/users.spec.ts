import { test, describe, expect, vi, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../../src/index';
import prisma from '../../src/__mocks__/prisma';
import { userSeed } from './mocks/users.mock';

beforeAll(() => {
  // Mock the prisma client
  vi.mock('../../src/prisma');

  // Mock the authenticateToken function
  vi.mock('../../src/authenticateToken', () => {
    return {
      default: (req, res, next) => {
        req.user = { id: 'ccf89a7e-b941-4f17-bbe0-4e0c8b2cd272' };
        next();
      },
    };
  });
});

describe('Get Users', () => {
  test('No Users returned', async ({}) => {
    prisma.user.findMany.mockResolvedValue([]);
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual([]);
  });

  test('Should get many users returned', async () => {
    prisma.user.findMany.mockResolvedValue(userSeed);

    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);

    const expectedResult = userSeed.map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt).toISOString(),
      updatedAt: new Date(item.updatedAt).toISOString(),
    }));

    expect(response.body[0]).not.toHaveProperty('password');

    expect(response.body).toEqual(expectedResult);
  });

  test('Network Error', async ({}) => {
    prisma.user.findMany.mockImplementation(() => {
      throw new Error('Test error');
    });
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(500);
    expect(response.body).toStrictEqual({
      error: 'Oops, something went wrong',
    });
  });
});

describe('Get user', () => {
  test('GET user info for existing user', async () => {
    prisma.user.findFirst.mockResolvedValue({
      id: 'ccf89a7e-b941-4f17-bbe0-4e0c8b2cd272',
      username: 'Dave',
      password: 'check',
      email: 'testing@backend.com',
      createdAt: new Date('2024-02-05T23:33:42.252Z'),
      updatedAt: new Date('2024-02-05T23:33:42.252Z'),
    });

    const response = await request(app).get('/api/user');
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
      id: 'ccf89a7e-b941-4f17-bbe0-4e0c8b2cd272',
      username: 'Dave',
      email: 'testing@backend.com',
      createdAt: '2024-02-05T23:33:42.252Z',
      updatedAt: '2024-02-05T23:33:42.252Z',
    });
  });
  test('Network Error', async ({}) => {
    prisma.user.findFirst.mockImplementation(() => {
      throw new Error('Test error');
    });
    const response = await request(app).get('/api/user');
    expect(response.status).toBe(500);
    expect(response.body).toStrictEqual({
      error: 'Oops, something went wrong',
    });
  });
});

describe('Create User', () => {
  test('POST with email, username and password', async ({}) => {
    prisma.user.create.mockResolvedValue({
      id: 'gcf89a7e-b941-4f17-bbe0-4e0c8b2cd272',
      email: 'test@email.com',
      username: 'Dave',
      password: 'check',
      updatedAt: new Date('2024-02-05T23:33:42.252Z'),
      createdAt: new Date('2024-02-05T23:33:42.252Z'),
    });
    const response = await request(app)
      .post('/api/users')
      .send({ email: 'email', username: 'Dave', password: 'check' });
    expect(response.status).toBe(200);
  });

  test('POST with existing username', async ({}) => {
    prisma.user.findFirst.mockResolvedValue({
      id: 'gcf89a7e-b941-4f17-bbe0-4e0c8b2cd272',
      email: 'email',
      username: 'Dave',
      password: 'check',
      updatedAt: new Date('2024-02-05T23:33:42.252Z'),
      createdAt: new Date('2024-02-05T23:33:42.252Z'),
    });
    const response = await request(app)
      .post('/api/users')
      .send({ email: 'email', username: 'Dave', password: 'check' });
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      error: 'Username or email already exists',
    });
  });

  test('POST without email', async ({}) => {
    const response = await request(app)
      .post('/api/users')
      .send({ username: 'Dave', password: 'check' });
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      error: 'email, password, and username fields required',
    });
  });

  test('POST without username', async ({}) => {
    const response = await request(app)
      .post('/api/users')
      .send({ email: 'Dave@hotmail.com', password: 'check' });
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      error: 'email, password, and username fields required',
    });
  });

  test('POST without password', async ({}) => {
    const response = await request(app)
      .post('/api/users')
      .send({ email: 'Dave@hotmail.com', username: 'check' });
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      error: 'email, password, and username fields required',
    });
  });

  test('POST with error', async ({}) => {
    prisma.user.create.mockImplementation(() => {
      throw new Error('Test error');
    });
    const response = await request(app)
      .post('/api/users')
      .send({ email: 'email', username: 'Dave', password: 'check' });
    expect(response.status).toBe(500);
    expect(response.body).toStrictEqual({
      error: 'Oops, something went wrong',
    });
  });
});

describe('Delete User', () => {
  test('DELETE with id', async ({}) => {
    prisma.user.delete.mockResolvedValue({
      id: 'ccf89a7e-b941-4f17-bbe0-4e0c8b2cd272',
      username: 'Dave',
      password: 'check',
      email: null,
      createdAt: new Date('2024-02-05T23:33:42.252Z'),
      updatedAt: new Date('2024-02-05T23:33:42.252Z'),
    });
    const response = await request(app).delete('/api/users/');
    expect(response.status).toBe(204);
  });

  test('DELETE with error', async ({}) => {
    prisma.user.delete.mockImplementation(() => {
      throw new Error('Test error');
    });
    const response = await request(app).delete('/api/users/');
    expect(response.status).toBe(500);
    expect(response.body).toStrictEqual({
      error: 'Oops, something went wrong',
    });
  });
});
