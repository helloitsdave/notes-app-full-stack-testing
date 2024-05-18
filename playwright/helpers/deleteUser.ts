import { request, expect, APIResponse } from '@playwright/test';
import getApiUrl from './getApiUrl';

const deleteUser = async (token: string | null): Promise<APIResponse> => {
  if (!token) {
    throw new Error('Token is required to delete user');
  }

  const context = await request.newContext({
    baseURL: await getApiUrl(),
  });

  const deleteResponse = await context.delete('/api/users', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  expect(deleteResponse.ok()).toBeTruthy();
  expect(deleteResponse.status()).toBe(204);

  return deleteResponse;
};

export default deleteUser;
