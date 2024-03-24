import { test, expect, Page, Response } from '@playwright/test';

const TIMESTAMP = Date.now();
const NOTE_TITLE = `My note ${TIMESTAMP}`;
const NOTE_CONTENT = `My note content ${TIMESTAMP}`;
const EDITED_NOTE_TITLE = `Edited note ${TIMESTAMP}`;
const EDITED_NOTE_CONTENT = `Edited note content ${TIMESTAMP}`;

let page: Page;
let notesApi: Promise<Response>;

const timeout = 60 * 1000;

test.beforeAll(async ({ browser }, { timeout }) => {
  page = await browser.newPage();

  await page.goto('/', { timeout });
});

test('Notes App e2e flow', async () => {
  await test.step('Should be able to login with valid user credentials', async () => {
    await expect(page.getByPlaceholder('Username')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();

    await page.fill('[data-testid=username]', 'Test User');
    await page.fill('[data-testid=password]', 'n0te$App!23');

    /** Free tier on render.com may take 60 seconds to startup */
    notesApi = page.waitForResponse(
      (response) =>
        response.url().includes('/api/notes') && response.status() === 200,
      { timeout }
    );

    await page.click('button[type="submit"]');
  });

  await test.step('Should have loaded', async () => {
    /** Wait for api response to complete */
    const notesApiResponse = await notesApi;
    const json = await notesApiResponse.json();

    /** Expect page to have loaded */
    await expect(page).toHaveTitle(/Notes/, { timeout });
    await expect(page.getByTestId('spinner-container')).toBeHidden({ timeout });

    /** Expect at least one note to exist */
    expect(json.length).toBeGreaterThan(0);
  });

  await test.step('Should be able to Add a Note', async () => {
    await page.getByRole('button', { name: 'Add a Note' }).click();
    await page.getByPlaceholder('Title').fill(NOTE_TITLE);
    await page.getByPlaceholder('Content').fill(NOTE_CONTENT);
    await page.getByRole('button', { name: 'Add Note' }).click();
  });

  await test.step('Should be able to see the new Note', async () => {
    await expect(page.getByTestId('note-title').first()).toHaveText(NOTE_TITLE);
    await expect(page.getByTestId('note-content').first()).toHaveText(
      NOTE_CONTENT
    );
  });

  await test.step('Should be able to Delete a Note', async () => {
    await page.getByTestId('note-delete-button').first().click();
    await expect(page.getByTestId('note-title').first()).not.toHaveText(
      NOTE_TITLE
    );
  });

  await test.step('Should be able to Edit a Note', async () => {
    await page.getByTestId('note').first().click();
    await expect(page.getByText('Save')).toBeVisible();
    await expect(page.getByText('Cancel')).toBeVisible();

    await page.getByPlaceholder('Title').fill(EDITED_NOTE_TITLE);
    await page.getByPlaceholder('Content').fill(EDITED_NOTE_CONTENT);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByTestId('note-title').first()).toHaveText(
      EDITED_NOTE_TITLE
    );
    await expect(page.getByTestId('note-content').first()).toHaveText(
      EDITED_NOTE_CONTENT
    );
  });

  await test.step('Should not be able to add Note without title', async () => {
    await page.getByRole('button', { name: 'Add a Note' }).click();
    await page.getByPlaceholder('Content').fill(NOTE_CONTENT);
    await page.getByRole('button', { name: 'Add Note' }).click();
    await expect(page.getByTestId('note-title').first()).not.toHaveText(
      NOTE_TITLE,
      { timeout }
    );
    await expect(page.getByTestId('note-content').first()).not.toHaveText(
      NOTE_CONTENT
    );
    // Close the modal
    await page.locator('button[class*="modal-close"]').click();
  });

  await test.step('Should be able to logout', async () => {
    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(page.getByPlaceholder('Username')).toBeVisible();
  });
});
