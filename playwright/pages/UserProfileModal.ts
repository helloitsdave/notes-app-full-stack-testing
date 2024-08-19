import { Page } from '@playwright/test';

class UserProfileModal {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  modal = () => this.page.getByTestId('user-info-modal');
  username = () => this.page.getByTestId('user-info-username');
  email = () => this.page.getByTestId('user-info-email');

  async close() {
    await this.page.locator('[class*="modal-close"]').first().click();
  }
}

export default UserProfileModal;
