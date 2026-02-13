import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for Login Page
 * URL: https://www.saucedemo.com/
 * 
 * @author Henry Perez (hlperez)
 */
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly errorButton: Locator;
  readonly logo: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Locators using data-test attributes (best practice)
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.errorButton = page.locator('.error-button');
    this.logo = page.locator('.login_logo');
  }

  /**
   * Navigate to the login page
   */
  async navigate() {
    await this.page.goto('/');
  }

  /**
   * Perform login action
   * @param username - Username to login with
   * @param password - Password to login with
   */
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Get error message text
   * @returns Error message text or null
   */
  async getErrorMessage(): Promise<string | null> {
    if (await this.errorMessage.isVisible()) {
      return await this.errorMessage.textContent();
    }
    return null;
  }

  /**
   * Check if error message is visible
   * @returns True if error is visible, false otherwise
   */
  async isErrorVisible(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }

  /**
   * Dismiss error message
   */
  async dismissError() {
    if (await this.errorButton.isVisible()) {
      await this.errorButton.click();
    }
  }

  /**
   * Check if login page is loaded
   * @returns True if on login page
   */
  async isLoaded(): Promise<boolean> {
    return await this.logo.isVisible();
  }

  /**
   * Get page title
   * @returns Page title
   */
  async getPageTitle(): Promise<string | null> {
    return await this.page.title();
  }
}
