import { Page } from '@playwright/test';
import UserProfileModal from './UserProfileModal';

class NotesPage {
  private page: Page;
  private userProfileModal: UserProfileModal;

  constructor(page: Page) {
    this.page = page;
    this.userProfileModal = new UserProfileModal(page);
  }

  spinnerContainer = () => this.page.getByTestId('spinner-container');
  addNewNoteButton = () =>
    this.page.getByRole('button', { name: 'Add a Note' });
  profileButton = () => this.page.getByRole('button', { name: 'Profile' });
  addNoteTitleInput = () => this.page.getByPlaceholder('Title');
  addNoteContentInput = () => this.page.getByPlaceholder('Content');
  addNoteButton = () => this.page.getByRole('button', { name: 'Add Note' });
  noteTitle = () => this.page.getByTestId('note-title');
  noteContent = () => this.page.getByTestId('note-content');
  deleteNoteButton = () => this.page.getByTestId('note-delete-button');
  note = () => this.page.getByTestId('note');
  saveNoteButton = () => this.page.getByRole('button', { name: 'Save' });
  closeNoteModalButton = () =>
    this.page.locator('[class*="modal-close"]').first();

  async viewUserProfile() {
    await this.profileButton().click();
    await this.userProfileModal.modal().waitFor({ state: 'visible' });
    return this.userProfileModal;
  }

  async goto() {
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
    await this.spinnerContainer().waitFor({
      state: 'hidden',
      timeout: 60 * 1000,
    });
  }

  async addNote(options: { title: string; content: string }) {
    await this.addNewNoteButton().click();
    await this.addNoteTitleInput().fill(options.title);
    await this.addNoteContentInput().fill(options.content);
    await this.addNoteButton().click();
  }

  async deleteNote() {
    await this.deleteNoteButton().first().click();
  }

  async editNote(options: { title: string; content: string }) {
    await this.note().first().click();
    await this.addNoteTitleInput().fill(options.title);
    await this.addNoteContentInput().fill(options.content);
    await this.saveNoteButton().click();
  }
}

export default NotesPage;
