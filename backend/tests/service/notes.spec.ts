import { config } from 'dotenv';
import { test, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { describe } from 'node:test';

config();

const BASE_URL = `${process.env.API_URL}`;
const NOTES_URL = `${BASE_URL}/api/notes`;

let createdID: number;
let token: string;

test('Health check', async () => {
  const response = await request(BASE_URL).get('/health');
  expect(response.status).toBe(200);
});

describe('Unauthenticated Flows', () => {
  test('Unauthenticated - Try to get the list of Notes', async () => {
    const getNoteResponse = await request(NOTES_URL).get('/');
    expect(getNoteResponse.status).toBe(401);
  });

  test('Unauthenticated - Try to create a note', async () => {
    const res = await request(NOTES_URL).post('/').send({
      title: 'This is a test note title with special characters: !@#$%^&*()',
      content:
        'This is a test note content with special characters: !@#$%^&*()',
    });
    expect(res.status).toBe(401);
  });

  test('Invalid username or password', async () => {
    const response = await request(BASE_URL).post('/api/login').send({
      password: 'wrong-password',
      username: 'Test User',
    });
    expect(response.status).toBe(401);
    expect(response.body.error).toBe('invalid username or password');
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

  test('Should only see notes for the given user ', async () => {
    const getNoteResponse = await request(NOTES_URL)
      .get('/')
      .set('Authorization', `Bearer ${token}`);

    expect(getNoteResponse.status).toBe(200);

    /** Should see 8 notes instead of all 9 in the database */
    expect(getNoteResponse.body).toHaveLength(8);

    expect(getNoteResponse.body[getNoteResponse.body.length - 1]).toStrictEqual(
      {
        content: 'Discussed project timelines and goals.',
        createdAt: '2024-02-05T23:33:42.252Z',
        id: 1,
        title: 'Meeting Notes',
        updatedAt: '2024-02-05T23:33:42.252Z',
        userID: 'ccf89a7e-b941-4f17-bbe0-4e0c8b2cd272',
      }
    );

    /** Should not see notes for a different user */
    expect(
      getNoteResponse.body.find(
        (note: { title: string }) =>
          note.title === 'Different User - scoping check'
      )
    ).toBeUndefined();
  });

  test('Create a new Note', async () => {
    const res = await request(NOTES_URL)
      .post('/')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'This is a test note title with special characters: !@#$%^&*()',
        content:
          'This is a test note content with special characters: !@#$%^&*()',
      });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(
      'This is a test note title with special characters: !@#$%^&*()'
    );
    expect(res.body.content).toBe(
      'This is a test note content with special characters: !@#$%^&*()'
    );

    createdID = res.body.id;

    const getNoteResponse = await request(NOTES_URL)
      .get('/')
      .set('Authorization', `Bearer ${token}`);
    expect(getNoteResponse.status).toBe(200);
    expect(getNoteResponse.body).toHaveLength(9);
  });

  test('Update a Note', async () => {
    const updateRes = await request(NOTES_URL)
      .put(`/${createdID}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'This is an updated test note title',
        content: 'This is an updated test note content',
      });
    expect(updateRes.status).toBe(200);
    expect(updateRes.body.title).toBe('This is an updated test note title');
    expect(updateRes.body.content).toBe('This is an updated test note content');

    const getNoteResponse = await request(NOTES_URL)
      .get('/')
      .set('Authorization', `Bearer ${token}`);
    expect(getNoteResponse.status).toBe(200);
    expect(getNoteResponse.body).toHaveLength(9);

    // Updated note should appear first in the list
    expect(getNoteResponse.body[0].id).toBe(createdID);
  });

  test('Delete a Note', async () => {
    const deleteRes = await request(NOTES_URL)
      .delete(`/${createdID}`)
      .set('Authorization', `Bearer ${token}`);
    expect(deleteRes.status).toBe(200);

    const getNoteResponse = await request(NOTES_URL)
      .get('/')
      .set('Authorization', `Bearer ${token}`);
    expect(getNoteResponse.status).toBe(200);
    expect(getNoteResponse.body).toHaveLength(8);
  });

  test('Error handling: Attempt to Delete a Note with invalid ID', async () => {
    const deleteRes = await request(NOTES_URL)
      .delete(`/invalid-id`)
      .set('Authorization', `Bearer ${token}`);
    expect(deleteRes.status).toBe(400);
    expect(deleteRes.body.error).toBe('ID field required');
  });
});
