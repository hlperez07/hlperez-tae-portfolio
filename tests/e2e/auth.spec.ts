import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

/**
 * Test Suite: Authentication
 * Tests login functionality with different user types and scenarios
 * 
 * @author Henry Perez (hlperez)
 * @tags @auth @smoke @regression @qa @prod
 */
test.describe('Authentication Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.navigate();
  });

  test('TC-AUTH-001: Successful login with standard user @smoke @regression @qa @prod', async ({ page }) => {
    // Arrange
    const username = 'standard_user';
    const password = 'secret_sauce';

    // Act
    await loginPage.login(username, password);

    // Assert
    await expect(page).toHaveURL(/.*inventory/);
    await expect(inventoryPage.pageTitle).toHaveText('Products');
    await expect(inventoryPage.shoppingCartLink).toBeVisible();
    
    const productCount = await inventoryPage.getProductCount();
    expect(productCount).toBe(6);
  });

  test('TC-AUTH-002: Login with locked user @regression @qa @prod', async ({ page }) => {
    // Arrange
    const username = 'locked_out_user';
    const password = 'secret_sauce';

    // Act
    await loginPage.login(username, password);

    // Assert
    await expect(page).toHaveURL('/');
    
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain('Epic sadface: Sorry, this user has been locked out');
    
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('TC-AUTH-003: Login with invalid credentials @regression @qa @prod', async ({ page }) => {
    // Arrange
    const username = 'invalid_user';
    const password = 'wrong_password';

    // Act
    await loginPage.login(username, password);

    // Assert
    await expect(page).toHaveURL('/');
    
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain('Username and password do not match');
  });

  test('TC-AUTH-004: Login with empty fields @regression @qa @prod', async ({ page }) => {
    // Act
    await loginPage.login('', '');

    // Assert
    await expect(page).toHaveURL('/');
    
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain('Username is required');
  });

  test('TC-AUTH-005: Login with empty password @regression @qa', async ({ page }) => {
    // Arrange
    const username = 'standard_user';

    // Act
    await loginPage.login(username, '');

    // Assert
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain('Password is required');
  });

  test('TC-AUTH-006: Successful logout @smoke @regression @qa @prod', async ({ page }) => {
    // Arrange - Login first
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory/);

    // Act
    await inventoryPage.logout();

    // Assert
    await expect(page).toHaveURL('/');
    await expect(loginPage.loginButton).toBeVisible();
    
    // Verify cannot access inventory without login
    await page.goto('/inventory.html');
    await expect(page).toHaveURL('/');
  });

  test('TC-AUTH-007: Login with problem user @regression @qa', async ({ page }) => {
    // Arrange
    const username = 'problem_user';
    const password = 'secret_sauce';

    // Act
    await loginPage.login(username, password);

    // Assert - Should login but may have issues
    await expect(page).toHaveURL(/.*inventory/);
    await expect(inventoryPage.pageTitle).toHaveText('Products');
    
    // Note: problem_user may have broken images or other UI issues
    // This is expected behavior for testing purposes
  });

  test('TC-AUTH-008: Login with performance glitch user @regression @qa', async ({ page }) => {
    // Arrange
    const username = 'performance_glitch_user';
    const password = 'secret_sauce';

    // Act
    const startTime = Date.now();
    await loginPage.login(username, password);
    const endTime = Date.now();
    const loadTime = endTime - startTime;

    // Assert
    await expect(page).toHaveURL(/.*inventory/);
    
    // This user should have slower performance (>2 seconds typically)
    console.log(`Performance glitch user login took: ${loadTime}ms`);
    
    // Verify functionality still works despite performance issues
    const productCount = await inventoryPage.getProductCount();
    expect(productCount).toBe(6);
  });

  test('TC-AUTH-009: Error message can be dismissed @regression @qa', async ({ page }) => {
    // Arrange
    await loginPage.login('invalid', 'invalid');
    await expect(loginPage.errorMessage).toBeVisible();

    // Act
    await loginPage.dismissError();

    // Assert
    await expect(loginPage.errorMessage).not.toBeVisible();
  });

  test('TC-AUTH-010: Login button is enabled during submission @regression @qa', async ({ page }) => {
    // This test verifies UX behavior during form submission
    await loginPage.usernameInput.fill('standard_user');
    await loginPage.passwordInput.fill('secret_sauce');
    
    // Check initial state
    await expect(loginPage.loginButton).toBeEnabled();
    
    // After clicking, user should be redirected quickly
    await loginPage.loginButton.click();
    await expect(page).toHaveURL(/.*inventory/, { timeout: 5000 });
  });
});

/**
 * Test Suite: Authentication - Visual Tests
 * Tests for UI elements and styling
 */
test.describe('Authentication - Visual Tests @qa', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('Login page has correct title @smoke', async ({ page }) => {
    const title = await page.title();
    expect(title).toBe('Swag Labs');
  });

  test('Login page has Swag Labs logo', async ({ page }) => {
    await expect(loginPage.logo).toBeVisible();
    await expect(loginPage.logo).toHaveText('Swag Labs');
  });

  test('Login form has all required elements', async ({ page }) => {
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    
    // Check placeholders
    await expect(loginPage.usernameInput).toHaveAttribute('placeholder', 'Username');
    await expect(loginPage.passwordInput).toHaveAttribute('placeholder', 'Password');
  });
});
