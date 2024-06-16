import { test, expect, Page } from '@playwright/test';
import { allure } from 'allure-playwright';
import LoginPage from '../pages/LoginPage';
import NotesPage from '../pages/NotesPage';

let page: Page;
let loginPage: LoginPage;
let notesPage: NotesPage;

const timeout = 2 * 60 * 1000;

test.beforeAll(async ({ browser }) => {
  await allure.feature('User Login');
  page = await browser.newPage();
  loginPage = new LoginPage(page);
  notesPage = new NotesPage(page);
});

test.beforeEach(async () => {
  await loginPage.goto();
});

test.describe('Notes App Login', { tag: ['@PRODUCTION'] }, async () => {
  test('should see user successfully logged in', async () => {
    await loginPage.login('dave', 'test');
    await expect(page).toHaveTitle(/Notes/, { timeout });
    await expect(notesPage.spinnerContainer()).toBeHidden({ timeout });
  });
  test('should see error message when login fails', async () => {
    await loginPage.login('dave', 'wrongpassword');
    await expect(loginPage.loginErrorText()).toHaveText(
      'Invalid username or password'
    );
  });
});
