import { request, expect, APIResponse } from '@playwright/test';
import getApiUrl from './getApiUrl';

const apiLogin = async (options: {
  username: string;
  password: string;
}): Promise<APIResponse> => {
  if (!options.username || !options.password) {
    throw new Error('Username and Password is required to login');
  }

  const context = await request.newContext({
    baseURL: await getApiUrl(),
  });

  const loginResponse = await context.post('/api/login', {
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      username: options.username,
      password: options.password,
    },
  });

  expect(loginResponse.ok()).toBeTruthy();
  expect(loginResponse.status()).toBe(200);
  return loginResponse;
};

export default apiLogin;
