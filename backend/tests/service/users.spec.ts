import { config } from 'dotenv';
import { test, expect, beforeAll, describe } from 'vitest';
import request from 'supertest';
import { faker } from '@faker-js/faker';

config();

const BASE_URL = `${process.env.API_URL}`;
const USERS_URL = `${BASE_URL}/api/users`;

const username = faker.internet.userName().toLowerCase();
const email = faker.internet.email();
const password = faker.internet.password();

let token: string;

describe('Unauthenticated Flows', () => {
  test('Should not be able to get the list of Users', async () => {
    const getUsersResponse = await request(USERS_URL).get('/');
    expect(getUsersResponse.status).toBe(401);
  });
});

describe('Authenticated Flows', () => {
  beforeAll(async () => {
    const response = await request(BASE_URL).post('/api/login').send({
      password: 'n0te$App!23',
      username: 'Test User',
    });
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
    // Set Token for future requests
    token = response.body.token;
  });

  test('Get the list of Users', async () => {
    const getUsersResponse = await request(USERS_URL)
      .get('/')
      .set('Authorization', `Bearer ${token}`);
    expect(getUsersResponse.status).toBe(200);
    expect(getUsersResponse.body.length).toBeGreaterThan(0);
  });

  test("Username's should be unique", async () => {
    const response = await request(USERS_URL)
      .post('/')
      .set('Authorization', `Bearer ${token}`)
      .send({
        username: 'Test User',
        password: 'n0te$App!23',
        email: 'helloitsdave@hotmail.com',
      });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Username or email already exists');
  });

  test('Create a new User', async () => {
    const response = await request(USERS_URL)
      .post('/')
      .set('Authorization', `Bearer ${token}`)
      .send({
        username,
        password,
        email,
      });
    expect(response.status).toBe(200);
    expect(response.body.id).toBeDefined();
  });

  test('Delete a User', async () => {
    const response = await request(USERS_URL)
      .delete('q/')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(204);
  });
});
