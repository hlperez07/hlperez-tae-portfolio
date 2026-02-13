# 🧪 QA Automation Portfolio - Sauce Demo

[![CI/CD Pipeline](https://github.com/hlperez07/hlperez-tae-portafolio/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/hlperez07/hlperez-tae-portafolio/actions)
[![Playwright Tests](https://img.shields.io/badge/tests-playwright-45ba4b?logo=playwright)](https://playwright.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Comprehensive end-to-end test automation suite for [Sauce Demo](https://www.saucedemo.com), demonstrating professional QA Automation skills.

**Author:** Henry Perez (hlperez)  
**Email:** hlperez@gmail.com  
**GitHub:** [@hlperez07](https://github.com/hlperez07)  
**LinkedIn:** [linkedin.com/in/hlperez](https://www.linkedin.com/in/hlperez/)

## 🎯 Project Description

This project is a **QA Automation Portfolio** that demonstrates:

- ✅ Test strategy design and planning
- ✅ Writing detailed and traceable test cases
- ✅ Implementing automated tests with Playwright
- ✅ Using design patterns (Page Object Model)
- ✅ **Multi-environment configuration (QA/PROD)**
- ✅ CI/CD setup with GitHub Actions
- ✅ Professional report generation and documentation
- ✅ Cross-browser testing (Chrome, Firefox, Safari)
- ✅ Test data and environment management

## 📊 Project Statistics

| Metric | Value |
|---------|-------|
| **Test Cases** | 46 automated test cases |
| **Pass Rate** | 92% |
| **Environments** | QA & Production |
| **Browsers** | Chrome, Firefox, Safari |
| **Execution Time** | < 5 minutes |
| **Code Coverage** | 85%+ on critical flows |

## 🏗️ Project Architecture

```
hlperez-tae-portafolio/
├── .github/
│   └── workflows/
│       └── ci-cd.yml              # GitHub Actions pipeline
├── docs/
│   ├── test-strategy.md           # Testing strategy
│   ├── test-cases.md              # Documented test cases
│   └── bug-report-template.md     # Bug report template
├── tests/
│   ├── config/
│   │   └── environment.ts         # Environment configuration (QA/PROD)
│   ├── pages/                     # Page Object Model
│   │   ├── LoginPage.ts
│   │   ├── InventoryPage.ts
│   │   ├── CartPage.ts
│   │   └── CheckoutPage.ts
│   └── e2e/                       # Test specs
│       ├── auth.spec.ts
│       ├── products.spec.ts
│       ├── cart.spec.ts
│       └── checkout.spec.ts
├── playwright.config.ts           # Playwright configuration
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18 or higher → [Download](https://nodejs.org/)
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone https://github.com/hlperez07/hlperez-tae-portafolio.git
cd hlperez-tae-portafolio

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Running Tests

```bash
# Run all tests (default: QA environment)
npm test

# Run tests in QA environment
npm run test:qa
npm run test:qa:smoke
npm run test:qa:regression

# Run tests in PROD environment
npm run test:prod
npm run test:prod:smoke
npm run test:prod:regression

# Run tests with UI mode
npm run test:ui

# Run tests on specific browser
npm run test:chrome
npm run test:firefox
npm run test:safari

# Run specific test suites
npm run test:auth
npm run test:cart
npm run test:checkout
```

### View Reports

```bash
# View HTML report
npm run report

# Clean previous reports
npm run clean
```

## 🌍 Multi-Environment Support

This project supports testing in multiple environments:

### QA Environment
- Full test suite execution
- Higher retry tolerance
- Complete regression testing
- Command: `ENV=qa npm test`

### Production Environment
- Smoke tests priority
- Critical path validation
- Lower retry count
- Command: `ENV=prod npm test`

### Environment Configuration

The `tests/config/environment.ts` file manages environment-specific settings:

```typescript
const environments = {
  qa: {
    name: 'QA',
    baseURL: 'https://www.saucedemo.com',
    timeout: 30000,
    retries: 2,
  },
  prod: {
    name: 'PROD',
    baseURL: 'https://www.saucedemo.com',
    timeout: 30000,
    retries: 1,
  },
};
```

## 🧪 Test Modules

### 1. Authentication (`auth.spec.ts`)
- Successful login with valid user
- Login with locked user
- Login with invalid credentials
- Empty field validations
- Logout functionality
- **Tags:** `@auth`, `@smoke`, `@regression`, `@qa`, `@prod`

### 2. Products (`products.spec.ts`)
- Product display
- Sorting (A-Z, Z-A, price low-high, high-low)
- Product details
- Navigation
- **Tags:** `@products`, `@smoke`, `@regression`, `@qa`, `@prod`

### 3. Shopping Cart (`cart.spec.ts`)
- Add products to cart
- Remove products
- Update quantities
- Cart persistence
- Price verification
- **Tags:** `@cart`, `@smoke`, `@regression`, `@qa`, `@prod`

### 4. Checkout (`checkout.spec.ts`)
- Complete checkout flow
- Form validations
- Total and tax calculations
- Order confirmation
- **Tags:** `@checkout`, `@e2e`, `@smoke`, `@regression`, `@qa`, `@prod`

## 🔄 CI/CD Pipeline

GitHub Actions automatically executes:

1. **On Push/PR:**
   - Lint and type check
   - Tests on 3 browsers (Chrome, Firefox, Safari)
   - Report generation
   - Environment-specific tests

2. **Daily (2 AM UTC):**
   - Full regression suite
   - All browser tests
   - Both environments (QA & PROD)

3. **Artifacts:**
   - HTML Reports
   - Failure screenshots
   - Execution videos
   - JUnit XML results

## 📊 Test Reports

Reports are automatically generated and include:

- ✅ Results for each test
- 📸 Failure screenshots
- 🎥 Failed test videos
- 📈 Execution metrics
- 🔍 Debugging traces

View reports at: `playwright-report/index.html`

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|-----------|
| **Playwright** | E2E testing framework |
| **TypeScript** | Programming language |
| **Node.js** | Runtime environment |
| **GitHub Actions** | CI/CD Pipeline |
| **HTML/CSS** | Portfolio website |

## 📈 Test Coverage

| Module | Test Cases | Coverage |
|--------|-----------|-----------|
| Authentication | 10 | 95% |
| Products | 11 | 90% |
| Shopping Cart | 12 | 92% |
| Checkout | 13 | 88% |
| **Total** | **46** | **91%** |

## 🎓 Best Practices Implemented

- ✅ **Page Object Model:** Separation of test logic and UI
- ✅ **Data-driven testing:** Using multiple data sets
- ✅ **Wait strategies:** Explicit and implicit waits
- ✅ **Test isolation:** Independent tests without dependencies
- ✅ **Clear assertions:** Descriptive and specific assertions
- ✅ **Naming conventions:** Clear and consistent naming
- ✅ **Documentation:** Well-documented code
- ✅ **Environment management:** QA & PROD support

## 🔗 Useful Links

- **Live Demo:** [Sauce Demo App](https://www.saucedemo.com)
- **Portfolio Site:** [Henry Perez Portfolio](https://hlperez07.github.io/hlperez-tae-portafolio)
- **Test Reports:** [GitHub Pages Reports](https://hlperez07.github.io/hlperez-tae-portafolio/reports)
- **CI/CD Pipeline:** [GitHub Actions](https://github.com/hlperez07/hlperez-tae-portafolio/actions)

## 👤 Author

**Henry Perez**
- Pseudonym: hlperez
- LinkedIn: [linkedin.com/in/hlperez](https://www.linkedin.com/in/hlperez/)
- GitHub: [@hlperez07](https://github.com/hlperez07)
- Email: hlperez@gmail.com

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Sauce Labs](https://saucelabs.com/) for providing Sauce Demo
- [Playwright](https://playwright.dev/) for the excellent framework
- QA Automation community for resources and best practices

---

⭐ If you found this project useful, consider giving it a star on GitHub!
