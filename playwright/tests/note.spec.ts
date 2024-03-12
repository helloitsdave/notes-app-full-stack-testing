import { test, expect, Page } from '@playwright/test';

const TIMESTAMP = Date.now();
const NOTE_TITLE = `My note ${TIMESTAMP}`;
const NOTE_CONTENT = `My note content ${TIMESTAMP}`;
const EDITED_NOTE_TITLE = `Edited note ${TIMESTAMP}`;
const EDITED_NOTE_CONTENT = `Edited note content ${TIMESTAMP}`;

let page: Page;

const timeout = 80 * 1000;

test.beforeAll(async ({ browser }, { timeout }) => {
  page = await browser.newPage();

  /** Free tier on render.com may take 60 seconds to startup */

  const notesApi = page.waitForResponse((response) => response.url().includes("/api/notes") && response.status() === 200, { timeout });

  await page.goto('/', { timeout });;

  await notesApi;

});

test('Notes App e2e', async () => {

  await test.step('Should have loaded', async () => {
    expect(page).toHaveTitle(/Notes/);
    expect(page.getByTestId('spinner-container')).not.toBeVisible({ timeout });
  });

  await test.step('Should be able to Add a Note', async () => {
    await page.getByRole('button', { name: 'Add a Note' }).click();
    await page.getByPlaceholder('Title').fill(NOTE_TITLE);
    await page.getByPlaceholder('Content').fill(NOTE_CONTENT);    
    await page.getByRole('button', { name: 'Add Note' }).click();
  });

  await test.step('Should be able to see the new Note', async () => {
    await expect(page.getByTestId('note-title').first()).toHaveText(NOTE_TITLE);
    await expect(page.getByTestId('note-content').first()).toHaveText(NOTE_CONTENT);
  });

  await test.step('Should be able to Delete a Note', async () => {
    await page.getByTestId('note-delete-button').first().click();
    await expect(page.getByTestId('note-title').first()).not.toHaveText(NOTE_TITLE);
  });

  await test.step('Should be able to Edit a Note', async () => {
    await page.getByTestId('note').first().click();
    expect(page.getByText('Save')).toBeVisible();
    expect(page.getByText('Cancel')).toBeVisible();

    await page.getByPlaceholder('Title').fill(EDITED_NOTE_TITLE);
    await page.getByPlaceholder('Content').fill(EDITED_NOTE_CONTENT);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByTestId('note-title').first()).toHaveText(EDITED_NOTE_TITLE);
    await expect(page.getByTestId('note-content').first()).toHaveText(EDITED_NOTE_CONTENT);
  });

  await test.step('Should not be able to add Note without title', async () => {
    await page.getByRole('button', { name: 'Add a Note' }).click();
    await page.getByPlaceholder('Content').fill(NOTE_CONTENT);
    await page.getByRole('button', { name: 'Add Note' }).click();
    await expect(page.getByTestId('note-title').first()).not.toHaveText(NOTE_TITLE, { timeout });
    await expect(page.getByTestId('note-content').first()).not.toHaveText(NOTE_CONTENT);
  });
});