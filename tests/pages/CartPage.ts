import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for Shopping Cart Page
 * URL: https://www.saucedemo.com/cart.html
 * 
 * @author Henry Perez (hlperez)
 */
export class CartPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly cartItems: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;
  readonly cartQuantity: Locator;
  readonly cartItemName: Locator;
  readonly cartItemPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    
    this.pageTitle = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cartQuantity = page.locator('.cart_quantity');
    this.cartItemName = page.locator('.inventory_item_name');
    this.cartItemPrice = page.locator('.inventory_item_price');
  }

  async navigate() {
    await this.page.goto('/cart.html');
  }

  async getPageTitle(): Promise<string | null> {
    return await this.pageTitle.textContent();
  }

  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async getCartItemNames(): Promise<string[]> {
    return await this.cartItemName.allTextContents();
  }

  async getCartItemPrices(): Promise<number[]> {
    const priceTexts = await this.cartItemPrice.allTextContents();
    return priceTexts.map(price => parseFloat(price.replace('$', '')));
  }

  async removeItem(productName: string) {
    const removeButton = this.page.locator(`[data-test="remove-${this.formatProductName(productName)}"]`);
    await removeButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async isCartEmpty(): Promise<boolean> {
    const count = await this.getCartItemCount();
    return count === 0;
  }

  private formatProductName(productName: string): string {
    return productName
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[()]/g, '');
  }

  async isLoaded(): Promise<boolean> {
    return await this.pageTitle.isVisible();
  }
}
