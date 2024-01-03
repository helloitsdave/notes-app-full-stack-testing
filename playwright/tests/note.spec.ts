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

test('Create, View and Delete Note e2e', async () => {
  await test.step('Add a note', async () => {
    await page.getByPlaceholder('Title').fill(NOTE_TITLE);
    await page.getByPlaceholder('Content').fill(NOTE_CONTENT);
    await page.getByRole('button', { name: 'Add Note' }).click();
  });

  await test.step('Verify note was added', async () => {
    await expect(page.getByTestId('note-title').first()).toHaveText(NOTE_TITLE);
    await expect(page.getByTestId('note-content').first()).toHaveText(NOTE_CONTENT);
  });

  await test.step('Delete note', async () => {
    await page.getByTestId('note-item').first().getByTestId('delete-button').click();
    await expect(page.getByTestId('note-title').first()).not.toHaveText(NOTE_TITLE);
  });
});

test('Note without Title', async () => {
  await test.step('Add a note without a title', async () => {
    await page.getByPlaceholder('Content').fill(NOTE_CONTENT);
    await page.getByRole('button', { name: 'Add Note' }).click();
  });

  await test.step('Verify note was not added', async () => {
    await expect(page.getByTestId('note-title').first()).not.toHaveText(NOTE_TITLE);
    await expect(page.getByTestId('note-content').first()).not.toHaveText(NOTE_CONTENT);
  });
});