# Bug Report Template

## Overview
This document provides a standard template for reporting bugs found during Sauce Demo testing.

---

## BUG-001: [Descriptive Bug Title]

### 📋 Basic Information
| Field | Value |
|-------|-------|
| **Bug ID** | BUG-001 |
| **Reporter** | Henry Perez (hlperez) |
| **Date Reported** | 2026-02-13 |
| **Environment** | QA / PROD |
| **Status** | 🟢 Open / 🟡 In Progress / 🔵 Fixed / ⚫ Closed |

### 🔴 Severity & Priority
| Classification | Level |
|----------------|-------|
| **Severity** | 🔴 Critical / 🟠 High / 🟡 Medium / 🟢 Low |
| **Priority** | P0 / P1 / P2 / P3 |

**Severity Definitions:**
- 🔴 **Critical:** Application crash, data loss, security vulnerability
- 🟠 **High:** Major feature broken, blocking workflow
- 🟡 **Medium:** Feature partially working, workaround available
- 🟢 **Low:** Minor UI issue, cosmetic problem

**Priority Definitions:**
- **P0:** Fix immediately, blocks release
- **P1:** Fix within 24 hours
- **P2:** Fix within current sprint
- **P3:** Fix in next sprint or backlog

---

### 🖥️ Environment Details
```
OS: Windows 11 / macOS 14 / Ubuntu 22.04
Browser: Chrome 120.0.6099.129
Resolution: 1920x1080
Device: Desktop / Mobile / Tablet
Environment: QA / PROD
URL: https://www.saucedemo.com/inventory.html
```

---

### 📝 Bug Description
**Short Summary:**
Brief one-line description of the issue

**Detailed Description:**
Comprehensive explanation of what's wrong, including:
- What feature/functionality is affected
- What behavior was observed
- Impact on users or system

---

### 🔄 Steps to Reproduce

**Preconditions:**
- User is logged in as `standard_user`
- Shopping cart is empty
- Browser cache is cleared

**Steps:**
1. Navigate to https://www.saucedemo.com
2. Login with username: `standard_user`, password: `secret_sauce`
3. Click on "Sauce Labs Backpack" product
4. Click "Add to cart" button
5. Navigate to cart page
6. Observe the issue

---

### ✅ Expected Result
Describe what should happen:
- User should be able to add product to cart
- Cart badge should display "1"
- Product should appear in cart page with correct details
- Price should be $29.99

---

### ❌ Actual Result
Describe what actually happens:
- Product is not added to cart
- Cart badge shows "0" even after clicking "Add to cart"
- Cart page is empty
- Error message appears: "Failed to add item to cart"

---

### 📸 Screenshots & Evidence

**Before Action:**
![Screenshot before](screenshots/bug-001-before.png)

**Issue Observed:**
![Screenshot showing issue](screenshots/bug-001-issue.png)

**Error Message:**
![Error message](screenshots/bug-001-error.png)

**Video Recording:**
[Link to screen recording: bug-001-recording.mp4]

---

### 🔍 Additional Information

**Console Errors:**
```javascript
Uncaught TypeError: Cannot read property 'addToCart' of undefined
    at InventoryPage.addProduct (inventory.js:45)
    at onClick (button.jsx:23)
```

**Network Requests:**
```
POST /api/cart/add - Status: 500 Internal Server Error
Response: {"error": "Database connection failed"}
```

**Browser Console Logs:**
```
[ERROR] 14:32:15 - Failed to connect to database
[ERROR] 14:32:15 - Cart service unavailable
[WARN] 14:32:16 - Retrying request (1/3)
```

---

### 🔄 Reproducibility
- **Frequency:** Occurs 100% of the time (10/10 attempts)
- **Browsers Affected:** Chrome, Firefox, Safari
- **Environments Affected:** QA, PROD
- **Users Affected:** All users (`standard_user`, `problem_user`)
- **Data Affected:** All products

---

### 💡 Possible Cause
Based on investigation:
- Database connection timeout
- Cart service microservice down
- Session management issue
- Race condition in async operations

---

### 🔧 Suggested Fix
Potential solutions:
1. Add proper error handling for cart operations
2. Implement retry logic for database connections
3. Add user-friendly error message
4. Fix session timeout handling

---

### 🔗 Related Information

**Related Bugs:**
- BUG-002: Similar issue in checkout flow
- BUG-015: Cart state inconsistency

**Related Test Cases:**
- TC-CART-001: Add single product to cart
- TC-CART-002: Add multiple products to cart

**Affected Features:**
- Shopping cart
- Product inventory
- Checkout process

---

### 📊 Test Data Used
```json
{
  "username": "standard_user",
  "password": "secret_sauce",
  "product_id": "4",
  "product_name": "Sauce Labs Backpack",
  "quantity": 1,
  "environment": "QA",
  "timestamp": "2026-02-13T14:32:15Z"
}
```

---

### 📝 Notes & Comments

**2026-02-13 - Reporter (hlperez):**
Initial bug report created. Issue is blocking checkout testing.

**2026-02-14 - Developer:**
Investigating database connection pool settings. May be related to recent infrastructure changes.

**2026-02-15 - QA Lead:**
High priority - affects critical user journey. Escalating to P1.

---

### ✅ Verification Steps (For Developers)

After fix is deployed, verify:
1. Cart functionality works for all products
2. Cart badge updates correctly
3. No console errors
4. Database connections are stable
5. All related test cases pass
6. Works in both QA and PROD environments

---

### 🎯 Acceptance Criteria for Fix

The bug is considered fixed when:
- ✅ Users can add products to cart without errors
- ✅ Cart badge displays correct count
- ✅ Cart page shows added products
- ✅ No console errors or warnings
- ✅ Database queries complete successfully
- ✅ All regression tests pass
- ✅ Works across all supported browsers
- ✅ Validated in both QA and PROD

---

## Example Bug Reports

### Example 1: UI Bug

**BUG-042: Product image not loading for problem_user**

**Severity:** 🟡 Medium | **Priority:** P2  
**Environment:** QA

**Steps:**
1. Login as `problem_user`
2. Navigate to inventory page
3. Observe product images

**Expected:** All product images load correctly  
**Actual:** Images show broken image icon

**Screenshot:** [broken-images.png]

---

### Example 2: Functional Bug

**BUG-078: Checkout allows empty postal code**

**Severity:** 🟠 High | **Priority:** P1  
**Environment:** QA, PROD

**Steps:**
1. Add product to cart
2. Proceed to checkout
3. Enter first name and last name
4. Leave postal code empty
5. Click Continue

**Expected:** Error message: "Postal Code is required"  
**Actual:** User proceeds to overview page

**Impact:** Data validation bypass, potential issues

---

### Example 3: Environment-Specific Bug

**BUG-105: Timeout in PROD environment only**

**Severity:** 🔴 Critical | **Priority:** P0  
**Environment:** PROD only (not reproducible in QA)

**Steps:**
1. Login in PROD environment
2. Add product to cart
3. Observe timeout after 30 seconds

**Expected:** Cart updates within 3 seconds  
**Actual:** Request times out in PROD, works fine in QA

**Investigation:** PROD has different timeout settings

---

## Bug Tracking Workflow

```
New → Open → In Progress → Testing → Verified → Closed
                ↓
            Rejected/Won't Fix
```

**Status Definitions:**
- **New:** Bug just reported, not reviewed
- **Open:** Bug confirmed, awaiting assignment
- **In Progress:** Developer working on fix
- **Testing:** Fix deployed to test environment
- **Verified:** QA confirmed fix works
- **Closed:** Fix in production, all tests pass
- **Rejected:** Not a bug or won't fix

---

## Tips for Effective Bug Reporting

1. **Be Specific:** Provide exact steps, not vague descriptions
2. **One Bug Per Report:** Don't combine multiple issues
3. **Include Evidence:** Screenshots, videos, logs are crucial
4. **Test Thoroughly:** Try to reproduce before reporting
5. **Check Duplicates:** Search existing bugs first
6. **Use Clear Language:** Avoid jargon, be concise
7. **Provide Context:** Explain impact and urgency
8. **Update Status:** Keep the bug report current
9. **Specify Environment:** Always mention QA or PROD
10. **Tag Appropriately:** Use proper severity and priority

---

## Environment-Specific Reporting

### QA Environment Bugs
- May include experimental features
- Can have lower priority
- Used for testing new functionality

### PROD Environment Bugs
- Always high priority
- Affect real users
- Need immediate attention
- Require careful validation

---

**Document Version:** 1.0  
**Last Updated:** February 2026  
**Maintained by:** Henry Perez (hlperez)  
**Email:** hlperez@gmail.com  
**GitHub:** @hlperez07
