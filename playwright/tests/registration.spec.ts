import { test, expect, Page } from '@playwright/test';

let page: Page;
const timeout = 60 * 1000;
const TIMESTAMP = Date.now();

test.beforeAll(async ({ browser }, { timeout }) => {
  page = await browser.newPage();
  await page.goto('/', { timeout });
});

test('User Registration', async () => {
  await page.getByRole('link', { name: 'Sign up' }).click();

  await expect(
    page.getByRole('heading', { name: 'Register new account' })
  ).toBeVisible();

  await page.fill('input[name="username"]', `user${TIMESTAMP}`);
  await page.fill('input[name="email"]', `user${TIMESTAMP}@mail.com`);
  await page.fill('input[name="password"]', 'auto');
  await page.fill('input[name="confirmPassword"]', 'auto');

  await page.getByRole('button', { name: 'Register' }).click();

  /** Free tier on render.com may take 60 seconds to startup */

  await expect(page.getByText('Account created successfully!')).toBeVisible({
    timeout,
  });
});
