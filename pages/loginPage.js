import { BasePage } from './basePage.js';

export class LoginPage extends BasePage {
  constructor(page, baseURL) {
    super(page, baseURL);
    this.usernameInput = 'input[name="username"]';
    this.passwordInput = 'input[name="password"]';
    this.loginButton = 'button[type="submit"]';
    this.errorMessage = '.error-message';
  }

  async open() {
    await this.goto('/login');
  }

  async login({ username, password }) {
    await this.type(this.usernameInput, username);
    await this.type(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  async getErrorMessage() {
    return this.getText(this.errorMessage);
  }
}
