import { test, expect, Page } from '@playwright/test';
import RegistrationPage from '../pages/RegistrationPage';
import { faker } from '@faker-js/faker';

let page: Page;
let registrationPage: RegistrationPage;
const timeout = 60 * 1000; // Render.com free tier may take 60 seconds to startup

const username = faker.internet.userName().toLowerCase();
const email = faker.internet.email();
const password = faker.internet.password();

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  registrationPage = new RegistrationPage(page);
  await registrationPage.goto();
});

test.describe('User Registration', async () => {
  test('Should be able to register new user', async () => {
    await expect(registrationPage.accountHeader()).toBeVisible();

    await registrationPage.register({
      username,
      email,
      password,
    });

    await expect(registrationPage.successMessage()).toBeVisible({ timeout });
  });
  test('Should not be able to register with existing username', async () => {
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
