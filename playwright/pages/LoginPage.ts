import { Page } from '@playwright/test';

class LoginPage {
  private page: Page;
  private defaultTimeout: number = 60 * 1000;

  constructor(page: Page) {
    this.page = page;
  }

  usernameInput = () => this.page.getByTestId('username');
  passwordInput = () => this.page.getByTestId('password');
  loginButton = () => this.page.getByRole('button', { name: 'Login' });
  signupLink = () => this.page.getByRole('link', { name: 'Sign up' });
  loginErrorText = () => this.page.getByTestId('login-error-text');

  async goto() {
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
    await this.loginButton().waitFor({ timeout: this.defaultTimeout });
  }

  async login(username: string, password: string) {
    await this.usernameInput().fill(username);
    await this.passwordInput().fill(password);
    await this.page.click('button[type=submit]');
  }
}

export default LoginPage;
