import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for Inventory/Products Page
 * URL: https://www.saucedemo.com/inventory.html
 * 
 * @author Henry Perez (hlperez)
 */
export class InventoryPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly productSort: Locator;
  readonly inventoryItems: Locator;
  readonly shoppingCartBadge: Locator;
  readonly shoppingCartLink: Locator;
  readonly hamburgerMenu: Locator;
  readonly inventoryItemName: Locator;
  readonly inventoryItemPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    
    this.pageTitle = page.locator('.title');
    this.productSort = page.locator('[data-test="product_sort_container"]');
    this.inventoryItems = page.locator('.inventory_item');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.hamburgerMenu = page.locator('#react-burger-menu-btn');
    this.inventoryItemName = page.locator('.inventory_item_name');
    this.inventoryItemPrice = page.locator('.inventory_item_price');
  }

  /**
   * Navigate to inventory page
   */
  async navigate() {
    await this.page.goto('/inventory.html');
  }

  /**
   * Get page title text
   */
  async getPageTitle(): Promise<string | null> {
    return await this.pageTitle.textContent();
  }

  /**
   * Get number of products displayed
   */
  async getProductCount(): Promise<number> {
    return await this.inventoryItems.count();
  }

  /**
   * Sort products by option
   * @param option - Sort option (az, za, lohi, hilo)
   */
  async sortProducts(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.productSort.selectOption(option);
  }

  /**
   * Add product to cart by name
   * @param productName - Name of the product
   */
  async addProductToCart(productName: string) {
    const addButton = this.page.locator(`[data-test="add-to-cart-${this.formatProductName(productName)}"]`);
    await addButton.click();
  }

  /**
   * Remove product from cart by name
   * @param productName - Name of the product
   */
  async removeProductFromCart(productName: string) {
    const removeButton = this.page.locator(`[data-test="remove-${this.formatProductName(productName)}"]`);
    await removeButton.click();
  }

  /**
   * Get shopping cart badge count
   */
  async getCartCount(): Promise<string | null> {
    if (await this.shoppingCartBadge.isVisible()) {
      return await this.shoppingCartBadge.textContent();
    }
    return null;
  }

  /**
   * Click on shopping cart
   */
  async goToCart() {
    await this.shoppingCartLink.click();
  }

  /**
   * Click on product by name to view details
   * @param productName - Name of the product
   */
  async clickProduct(productName: string) {
    await this.page.locator(`text=${productName}`).first().click();
  }

  /**
   * Get all product names in current order
   */
  async getAllProductNames(): Promise<string[]> {
    const names = await this.inventoryItemName.allTextContents();
    return names;
  }

  /**
   * Get all product prices in current order
   */
  async getAllProductPrices(): Promise<number[]> {
    const priceTexts = await this.inventoryItemPrice.allTextContents();
    return priceTexts.map(price => parseFloat(price.replace('$', '')));
  }

  /**
   * Open hamburger menu
   */
  async openMenu() {
    await this.hamburgerMenu.click();
  }

  /**
   * Logout from hamburger menu
   */
  async logout() {
    await this.openMenu();
    await this.page.locator('[data-test="logout-sidebar-link"]').click();
  }

  /**
   * Reset app state from hamburger menu
   */
  async resetAppState() {
    await this.openMenu();
    await this.page.locator('[data-test="reset-sidebar-link"]').click();
  }

  /**
   * Format product name for data-test attribute
   * Example: "Sauce Labs Backpack" -> "sauce-labs-backpack"
   */
  private formatProductName(productName: string): string {
    return productName
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[()]/g, '');
  }

  /**
   * Check if on inventory page
   */
  async isLoaded(): Promise<boolean> {
    return await this.pageTitle.isVisible();
  }
}
