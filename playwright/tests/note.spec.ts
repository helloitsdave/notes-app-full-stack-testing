import { test, expect, Page } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { allure } from 'allure-playwright';
import LoginPage from '../pages/LoginPage';
import NotesPage from '../pages/NotesPage';

let page: Page;
let loginPage: LoginPage;
let notesPage: NotesPage;

const timeout = 60 * 1000;
const NOTE_TITLE = faker.lorem.sentence();
const NOTE_CONTENT = faker.lorem.lines({ min: 1, max: 5 });
const EDITED_NOTE_TITLE = faker.lorem.sentence();
const EDITED_NOTE_CONTENT = faker.lorem.lines({ min: 1, max: 5 });

test.beforeAll(async ({ browser }) => {
  await allure.feature('Notes e2e flow');
  page = await browser.newPage();
  loginPage = new LoginPage(page);
  notesPage = new NotesPage(page);
  await loginPage.goto();
});

test.describe('Notes App e2e flow', { tag: ['@PRODUCTION'] }, async () => {
  test('Should see notes page login', async () => {
    await loginPage.login('dave', 'test');
    await expect(page).toHaveTitle(/Notes/, { timeout });
    await expect(notesPage.spinnerContainer()).toBeHidden({ timeout });
  });

  test('Should be able to Add a Note', async () => {
    await notesPage.addNote({
      title: NOTE_TITLE,
      content: NOTE_CONTENT,
    });
    await expect(notesPage.noteTitle().first()).toHaveText(NOTE_TITLE);
    await expect(notesPage.noteContent().first()).toHaveText(NOTE_CONTENT);
  });

  test('Should be able to Delete a Note', async () => {
    await notesPage.deleteNote();
    await expect(notesPage.noteTitle().first()).not.toHaveText(NOTE_TITLE);
  });

  test('Should be able to Edit a Note', async () => {
    await notesPage.editNote({
      title: EDITED_NOTE_TITLE,
      content: EDITED_NOTE_CONTENT,
    });
    await expect(notesPage.noteTitle().first()).toHaveText(EDITED_NOTE_TITLE);
    await expect(notesPage.noteContent().first()).toHaveText(
      EDITED_NOTE_CONTENT
    );
  });

  test('Should not be able to add Note without title', async () => {
    await notesPage.addNote({
      title: '',
      content: NOTE_TITLE,
    });
    // Close the modal
    await notesPage.closeNoteModalButton().click();

    await expect(notesPage.noteTitle().first()).not.toHaveText('', {
      timeout,
    });
    await expect(notesPage.noteTitle().first()).not.toHaveText(NOTE_CONTENT);
  });

  test('Should be able to logout', async () => {
    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(page.getByPlaceholder('Username')).toBeVisible();
  });
});
