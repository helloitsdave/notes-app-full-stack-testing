import { test, expect, Page, APIResponse } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { allure } from 'allure-playwright';
import RegistrationPage from '../pages/RegistrationPage';
import deleteUser from '../helpers/deleteUser';
import apiLogin from '../helpers/apiLogin';

let page: Page;
let registrationPage: RegistrationPage;
const timeout = 2 * 60 * 1000; // Render.com free tier may take 60 seconds to startup
let token: string;

const username = faker.internet.userName().toLowerCase();
const email = faker.internet.email();
const password = 'PA$$WORD';

test.beforeAll(async ({ browser }) => {
  await allure.feature('User Registration');

  page = await browser.newPage();
  registrationPage = new RegistrationPage(page);
  await registrationPage.goto();
});

test.afterAll(async () => {
  /**
   * Delete the user if it was created
   */
  if (token) {
    const deleteUserResponse = await deleteUser(token);
    expect(deleteUserResponse.ok()).toBeTruthy();
  }
});

test.describe('User Registration', { tag: ['@PRODUCTION'] }, async () => {
  test('Should be able to register new user', async () => {
    await expect(registrationPage.accountHeader()).toBeVisible();

    await registrationPage.register({
      username,
      email,
      password,
    });

    await expect(registrationPage.successMessage()).toBeVisible({ timeout });

    await test.step('Should be able to login with newly registered user', async () => {
      const loginResponse: APIResponse = await apiLogin({ username, password });

      expect(loginResponse.ok()).toBeTruthy();

      const json = await loginResponse.json();
      token = json.token;

      expect(json.token).toBeTruthy();
    });
  });

  test('Should not be able to register with existing username', async () => {
    await registrationPage.goto();

    await registrationPage.register({
      username: 'dave',
      email: faker.internet.email(),
      password,
      expectFailure: true,
    });

    await expect(registrationPage.errorMessage()).toHaveText(
      'Error: Invalid username or password'
    );
  });
});
