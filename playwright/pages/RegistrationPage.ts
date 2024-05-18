import { Page } from '@playwright/test';

class RegistrationPage {
  /**
   * @param {Page} page - Playwright page
   */

  private page: Page;
  private defaultTimeout: number = 60 * 1000;

  constructor(page: Page) {
    this.page = page;
  }
  usernameInput = () => this.page.locator('input[name="username"]');
  emailInput = () => this.page.locator('input[name="email"]');
  passwordInput = () => this.page.locator('input[name="password"]');
  confirmPasswordInput = () =>
    this.page.locator('input[name="confirmPassword"]');
  registerButton = () => this.page.getByRole('button', { name: 'Register' });
  successMessage = () =>
    this.page.locator('text="Account created successfully!"');
  accountHeader = () =>
    this.page.getByRole('heading', { name: 'Register new account' });
  errorMessage = () => this.page.locator('.registration-form-error');
  spinnerContainer = () => this.page.getByTestId('spinner-container');

  goto = async () => {
    await this.page.goto('/register');
    await this.page.waitForLoadState('domcontentloaded');
    await this.registerButton().waitFor({ timeout: this.defaultTimeout });
  };

  /**
   * Register a new user
   * @param options - Registration options
   * @param options.username - Username
   * @param options.email - Email
   * @param options.password - Password
   * @param options.expectFailure - Expect registration to fail
   */
  register = async (options: {
    username: string;
    email: string;
    password: string;
    expectFailure?: boolean;
    timeout?: number;
  }) => {
    await this.usernameInput().fill(options.username);
    await this.emailInput().fill(options.email);
    await this.passwordInput().fill(options.password);
    await this.confirmPasswordInput().fill(options.password);
    await this.registerButton().click();

    if (!options.expectFailure) {
      await this.successMessage().waitFor({
        timeout: options.timeout || this.defaultTimeout,
      });
    }
  };

  getLocalStorage = async () => {
    return await this.page.evaluate(() => JSON.stringify(window.localStorage));
  };
}

export default RegistrationPage;
