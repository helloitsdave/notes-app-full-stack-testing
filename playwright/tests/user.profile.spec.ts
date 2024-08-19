/* eslint-disable prettier/prettier */
import { test, expect, Page } from '@playwright/test';
import { allure } from 'allure-playwright';
import LoginPage from '../pages/LoginPage';
import NotesPage from '../pages/NotesPage';

let page: Page;
let loginPage: LoginPage;
let notesPage: NotesPage;

const timeout = 2 * 60 * 1000;

test.beforeAll(async ({ browser }) => {
  await allure.feature('User Profile');
  page = await browser.newPage();
  loginPage = new LoginPage(page);
  notesPage = new NotesPage(page);
});

test.beforeEach(async () => {
  await loginPage.goto();
  await loginPage.login('dave', 'test');
  await expect(page).toHaveTitle(/Notes/, { timeout });
  await expect(notesPage.spinnerContainer()).toBeHidden({ timeout });
});

test.describe('Notes App User Info', { tag: ['@PRODUCTION'] }, async () => {
  test('should be able to view user profile information', async () => {
    const profilePageModal = await notesPage.viewUserProfile();

    await expect(profilePageModal.modal()).toBeVisible();
    await expect(profilePageModal.username()).toContainText('dave');
    await expect(profilePageModal.email()).toContainText('@');


    await profilePageModal.close();
    await expect(profilePageModal.modal()).toBeHidden();
  });

});
