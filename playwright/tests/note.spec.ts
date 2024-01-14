import { test, expect, Page } from '@playwright/test';

const TIMESTAMP = Date.now();
const NOTE_TITLE = `My note ${TIMESTAMP}`;
const NOTE_CONTENT = `My note content ${TIMESTAMP}`;

let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  await page.goto('/');
  await expect(page).toHaveTitle(/Notes/);
});

test('Notes App e2e', async () => {
  await test.step('Should be able to view Notes', async () => {
    await page.getByPlaceholder('Title').fill(NOTE_TITLE);
    await page.getByPlaceholder('Content').fill(NOTE_CONTENT);
    await page.getByRole('button', { name: 'Add Note' }).click();
  });

  await test.step('Should be able to Add a new Note', async () => {
    await expect(page.getByTestId('note-title').first()).toHaveText(NOTE_TITLE);
    await expect(page.getByTestId('note-content').first()).toHaveText(NOTE_CONTENT);
  });

  await test.step('Should be able to Delete a Note', async () => {
    await page.getByTestId('note-delete-button').first().click();
    await expect(page.getByTestId('note-title').first()).not.toHaveText(NOTE_TITLE);
  });

  await test.step('Should not be able to add Note without title', async () => {
    await page.getByPlaceholder('Content').fill(NOTE_CONTENT);
    await page.getByRole('button', { name: 'Add Note' }).click();
    await expect(page.getByTestId('note-title').first()).not.toHaveText(NOTE_TITLE);
    await expect(page.getByTestId('note-content').first()).not.toHaveText(NOTE_CONTENT);
  });
});