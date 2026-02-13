import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for Checkout Pages
 * Includes: Checkout Information, Checkout Overview, and Checkout Complete
 * 
 * @author Henry Perez (hlperez)
 */
export class CheckoutPage {
  readonly page: Page;
  
  // Checkout Information Page
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;
  
  // Checkout Overview Page
  readonly pageTitle: Locator;
  readonly cartItems: Locator;
  readonly itemTotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;
  readonly finishButton: Locator;
  
  // Checkout Complete Page
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Checkout Information
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.errorMessage = page.locator('[data-test="error"]');
    
    // Overview
    this.pageTitle = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.itemTotal = page.locator('.summary_subtotal_label');
    this.tax = page.locator('.summary_tax_label');
    this.total = page.locator('.summary_total_label');
    this.finishButton = page.locator('[data-test="finish"]');
    
    // Complete
    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continue() {
    await this.continueButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  async getErrorMessage(): Promise<string | null> {
    if (await this.errorMessage.isVisible()) {
      return await this.errorMessage.textContent();
    }
    return null;
  }

  async getPageTitle(): Promise<string | null> {
    return await this.pageTitle.textContent();
  }

  async getItemTotal(): Promise<number> {
    const text = await this.itemTotal.textContent();
    return parseFloat(text?.replace('Item total: $', '') || '0');
  }

  async getTax(): Promise<number> {
    const text = await this.tax.textContent();
    return parseFloat(text?.replace('Tax: $', '') || '0');
  }

  async getTotal(): Promise<number> {
    const text = await this.total.textContent();
    return parseFloat(text?.replace('Total: $', '') || '0');
  }

  async getItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async finish() {
    await this.finishButton.click();
  }

  async getCompleteHeader(): Promise<string | null> {
    return await this.completeHeader.textContent();
  }

  async getCompleteText(): Promise<string | null> {
    return await this.completeText.textContent();
  }

  async backHome() {
    await this.backHomeButton.click();
  }

  async isOnCheckoutInfo(): Promise<boolean> {
    return await this.firstNameInput.isVisible();
  }

  async isOnCheckoutOverview(): Promise<boolean> {
    return await this.finishButton.isVisible();
  }

  async isOnCheckoutComplete(): Promise<boolean> {
    return await this.completeHeader.isVisible();
  }
}
