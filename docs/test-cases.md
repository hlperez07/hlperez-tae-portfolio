# Test Cases - Sauce Demo E-commerce

## Test Suite Overview

**Application:** Sauce Demo (Swag Labs)  
**URL:** https://www.saucedemo.com  
**Total Test Cases:** 46  
**Last Updated:** February 2026  
**Author:** Henry Perez (hlperez)

---

## 📊 Test Case Summary

| Module | Total Cases | Critical | High | Medium | Environments |
|--------|-------------|----------|------|--------|--------------|
| Authentication | 10 | 5 | 3 | 2 | QA, PROD |
| Product Catalog | 11 | 3 | 4 | 4 | QA, PROD |
| Shopping Cart | 12 | 4 | 4 | 4 | QA, PROD |
| Checkout | 13 | 6 | 4 | 3 | QA, PROD |
| **TOTAL** | **46** | **18** | **15** | **13** | Both |

---

# 🔐 MODULE 1: AUTHENTICATION

## TC-AUTH-001: Successful Login with Standard User
**Priority:** 🔴 Critical  
**Type:** Functional - Positive  
**Automation:** ✅ Automated  
**Environments:** @qa @prod  
**Tags:** @smoke @regression

### Preconditions
- User is on login page
- Browser cache cleared

### Test Data
```
Username: standard_user
Password: secret_sauce
```

### Test Steps
1. Navigate to https://www.saucedemo.com
2. Enter username "standard_user" in username field
3. Enter password "secret_sauce" in password field
4. Click "Login" button

### Expected Results
- ✅ User is redirected to `/inventory.html`
- ✅ Product catalog is displayed
- ✅ Page title shows "Products"
- ✅ Shopping cart icon is visible
- ✅ Hamburger menu is accessible
- ✅ No error messages displayed

### Acceptance Criteria
- URL contains "inventory"
- At least 6 products visible
- User can interact with products

---

## TC-AUTH-002: Login with Locked User
**Priority:** 🔴 Critical  
**Type:** Functional - Negative  
**Automation:** ✅ Automated  
**Environments:** @qa @prod  
**Tags:** @regression

### Test Data
```
Username: locked_out_user
Password: secret_sauce
```

### Test Steps
1. Navigate to login page
2. Enter username "locked_out_user"
3. Enter password "secret_sauce"
4. Click "Login" button

### Expected Results
- ❌ Login fails
- ❌ Error message displayed: "Epic sadface: Sorry, this user has been locked out."
- ❌ User remains on login page
- ❌ Error icon (❌) appears on input fields

---

## TC-AUTH-003: Login with Invalid Credentials
**Priority:** 🔴 Critical  
**Type:** Functional - Negative  
**Automation:** ✅ Automated  
**Environments:** @qa @prod  
**Tags:** @regression

### Test Data
```
Username: invalid_user
Password: wrong_password
```

### Expected Results
- ❌ Error message: "Epic sadface: Username and password do not match any user in this service"

---

## TC-AUTH-004: Login with Empty Fields
**Priority:** 🟠 High  
**Type:** Functional - Negative  
**Automation:** ✅ Automated  
**Environments:** @qa @prod  
**Tags:** @regression

### Test Data
```
Username: [empty]
Password: [empty]
```

### Expected Results
- ❌ Error message: "Epic sadface: Username is required"

---

## TC-AUTH-005: Login with Empty Password
**Priority:** 🟠 High  
**Type:** Functional - Negative  
**Automation:** ✅ Automated  
**Environments:** @qa  
**Tags:** @regression

### Test Data
```
Username: standard_user
Password: [empty]
```

### Expected Results
- ❌ Error message: "Epic sadface: Password is required"

---

## TC-AUTH-006: Successful Logout
**Priority:** 🔴 Critical  
**Type:** Functional - Positive  
**Automation:** ✅ Automated  
**Environments:** @qa @prod  
**Tags:** @smoke @regression

### Preconditions
- User is logged in

### Test Steps
1. Login as standard_user
2. Click hamburger menu (☰)
3. Click "Logout" option

### Expected Results
- ✅ User redirected to login page
- ✅ Session cleared
- ✅ Cannot access inventory page without login

---

# 🛍️ MODULE 2: PRODUCT CATALOG

## TC-PROD-001: View All Products
**Priority:** 🔴 Critical  
**Type:** Functional - Positive  
**Automation:** ✅ Automated  
**Environments:** @qa @prod  
**Tags:** @smoke @regression

### Expected Results
- ✅ Exactly 6 products displayed
- ✅ Each product has: Image, Name, Description, Price, "Add to cart" button
- ✅ Products: Backpack, Bike Light, Bolt T-Shirt, Fleece Jacket, Onesie, T-Shirt (Red)

---

## TC-PROD-002: Sort Products by Name (A-Z)
**Priority:** 🟠 High  
**Type:** Functional - Positive  
**Automation:** ✅ Automated  
**Environments:** @qa @prod  
**Tags:** @smoke @regression

### Test Steps
1. Login as standard_user
2. Click sort dropdown
3. Select "Name (A to Z)"

### Expected Results
- ✅ Products sorted alphabetically ascending
- ✅ First product: "Sauce Labs Backpack"
- ✅ Last product: "Test.allTheThings() T-Shirt (Red)"

---

## TC-PROD-003: Sort Products by Name (Z-A)
**Priority:** 🟠 High  
**Environments:** @qa @prod  
**Tags:** @regression

### Expected Order
- Test.allTheThings() T-Shirt (Red)
- Sauce Labs Onesie
- Sauce Labs Fleece Jacket
- Sauce Labs Bolt T-Shirt
- Sauce Labs Bike Light
- Sauce Labs Backpack

---

## TC-PROD-004: Sort Products by Price (Low to High)
**Priority:** 🟠 High  
**Environments:** @qa @prod  
**Tags:** @smoke @regression

### Expected Results
- ✅ First product: $7.99 (Onesie)
- ✅ Last product: $49.99 (Fleece Jacket)
- ✅ All prices in ascending order

---

# 🛒 MODULE 3: SHOPPING CART

## TC-CART-001: Add Single Product to Cart
**Priority:** 🔴 Critical  
**Type:** Functional - Positive  
**Automation:** ✅ Automated  
**Environments:** @qa @prod  
**Tags:** @smoke @regression

### Test Steps
1. Login as standard_user
2. Click "Add to cart" on "Sauce Labs Backpack"
3. Observe cart badge

### Expected Results
- ✅ Cart badge shows "1"
- ✅ Button changes to "Remove"

---

## TC-CART-002: Add Multiple Products to Cart
**Priority:** 🔴 Critical  
**Environments:** @qa @prod  
**Tags:** @smoke @regression

### Test Steps
1. Add 3 different products to cart
2. Verify cart badge

### Expected Results
- ✅ Cart badge shows "3"
- ✅ All 3 products have "Remove" button

---

## TC-CART-003: Remove Product from Inventory Page
**Priority:** 🟠 High  
**Environments:** @qa @prod  
**Tags:** @regression

### Expected Results
- ✅ Cart badge decrements
- ✅ Button changes back to "Add to cart"

---

## TC-CART-004: View Cart Contents
**Priority:** 🔴 Critical  
**Environments:** @qa @prod  
**Tags:** @smoke @regression

### Expected Results
- ✅ Cart page displays all added products
- ✅ Quantity shown for each item
- ✅ "Continue Shopping" button present
- ✅ "Checkout" button present

---

# 💳 MODULE 4: CHECKOUT PROCESS

## TC-CHECK-001: Complete Checkout with Valid Information
**Priority:** 🔴 Critical  
**Type:** E2E - Positive  
**Automation:** ✅ Automated  
**Environments:** @qa @prod  
**Tags:** @smoke @e2e @regression

### Test Data
```
First Name: John
Last Name: Doe
Zip Code: 12345
```

### Test Steps
1. Add products to cart
2. Navigate to cart
3. Click "Checkout"
4. Enter valid checkout information
5. Click "Continue"
6. Review order on overview page
7. Click "Finish"

### Expected Results
- ✅ Success page displays: "Thank you for your order!"
- ✅ "Back Home" button present
- ✅ Cart cleared

---

## TC-CHECK-002: Checkout with Empty First Name
**Priority:** 🔴 Critical  
**Environments:** @qa @prod  
**Tags:** @regression

### Expected Results
- ❌ Error: "Error: First Name is required"

---

## TC-CHECK-003: Checkout with Empty Last Name
**Priority:** 🔴 Critical  
**Environments:** @qa @prod  
**Tags:** @regression

### Expected Results
- ❌ Error: "Error: Last Name is required"

---

## TC-CHECK-004: Checkout with Empty Postal Code
**Priority:** 🔴 Critical  
**Environments:** @qa @prod  
**Tags:** @regression

### Expected Results
- ❌ Error: "Error: Postal Code is required"

---

## TC-CHECK-005: Verify Order Overview
**Priority:** 🔴 Critical  
**Environments:** @qa @prod  
**Tags:** @smoke @regression

### Expected Results
- ✅ All cart items listed
- ✅ Item total calculated correctly
- ✅ Tax displayed (8% typically)
- ✅ Grand total = Item Total + Tax

---

## Traceability Matrix

| Requirement | Test Cases | Environments |
|-------------|------------|--------------|
| REQ-001: User Authentication | TC-AUTH-001 to TC-AUTH-010 | QA, PROD |
| REQ-002: Product Display | TC-PROD-001, TC-PROD-006 | QA, PROD |
| REQ-003: Product Sorting | TC-PROD-002 to TC-PROD-005 | QA, PROD |
| REQ-004: Shopping Cart | TC-CART-001 to TC-CART-012 | QA, PROD |
| REQ-005: Checkout Process | TC-CHECK-001 to TC-CHECK-013 | QA, PROD |

---

## Environment-Specific Execution

### QA Environment (@qa)
- All 46 test cases
- Including experimental tests
- Higher retry tolerance

### Production Environment (@prod)
- Smoke tests priority
- Critical path tests
- Strict validation

---

**Document Version:** 1.0  
**Last Updated:** February 2026  
**Maintained by:** Henry Perez (hlperez)  
**Email:** hlperez@gmail.com
