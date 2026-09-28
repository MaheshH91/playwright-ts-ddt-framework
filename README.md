# Playwright TypeScript DDT Automation Framework

An enterprise-grade **End-to-End Test Automation Framework** built using **Playwright, TypeScript, and the Page Object Model (POM)** pattern, featuring comprehensive **Data-Driven Testing (DDT)** from JSON and Excel sources.

This framework is migrated and modernized from a traditional Selenium BDD framework into a native, high-performance Playwright architecture, targeting the [TutorialsNinja Demo Application](https://tutorialsninja.com/demo/).

---

## 📌 Table of Contents

* [Overview](#-overview)
* [Tech Stack](#-tech-stack)
* [Key Features](#-key-features)
* [Architecture](#-architecture)
* [Project Structure](#-project-structure)
* [Prerequisites](#-prerequisites)
* [Installation & Setup](#-installation--setup)
* [Configuration](#%EF%B8%8F-configuration)
* [Data-Driven Testing (DDT)](#-data-driven-testing-ddt)
* [Running Tests](#-running-tests)
* [Parallel Execution & Worker Isolation](#-parallel-execution--worker-isolation)
* [HTML Reports & Artifacts](#-html-reports--artifacts)
* [CI/CD Integration](#-cicd-integration)
* [Author](#-author)

---

## 🚀 Overview

This framework combines the modern capabilities of Playwright with rigorous test automation engineering principles:

* **Page Object Model (POM):** Complete abstraction of UI elements and user actions from the test logic.
* **Custom Playwright Fixtures:** Native dependency injection replacing static context managers and manual instantiations.
* **Dual-Source DDT:** Direct parameterized test generation using nested JSON data and multi-sheet Excel files (`.xlsx`).
* **Multi-Browser & Headless Execution:** First-class support for Chromium (Chrome), Firefox, and MS Edge.
* **Resilience & Auto-Waiting:** Uses Playwright's built-in actionability checks, eliminating hard-coded sleeps and fragile explicit waits.

---

## 🛠 Tech Stack

| Technology | Version / Role |
| :--- | :--- |
| **Language** | TypeScript (ES2022) |
| **Runtime** | Node.js (v18+ or v20+) |
| **Engine** | [@playwright/test](https://playwright.dev/) |
| **Data Parsing (Excel)** | [xlsx (SheetJS)](https://sheetjs.com/) |
| **Environment Config** | [dotenv](https://github.com/motdotla/dotenv) |
| **CI/CD** | GitHub Actions / Jenkins |
| **Browsers** | Chromium, Firefox, Microsoft Edge |

---

## ✨ Key Features

### 1. Robust Page Object Model (POM)
All UI locators and user interactions are encapsulated inside distinct page classes inheriting from `BasePage`:
* `HomePage`: Navigation, top menus, and global search bar interactions.
* `LoginPage`: Credentials input, login button clicks, and authentication alerts.
* `RegisterPage`: Form population, newsletter toggles, privacy policy agreements, and error validation.
* `AccountPage` & `AccountSuccessPage`: Authenticated state verification and session management.
* `SearchPage`: Search result lists and empty result validation.

### 2. Dependency Injection via Test Fixtures
Replaces manual driver initialization and teardown with Playwright's `test.extend<Pages>()`. Page instances (`homePage`, `loginPage`, `registerPage`, etc.) are injected directly into test functions with isolated browser contexts.

### 3. Data-Driven Testing (DDT)
* **JSON DDT:** Iterates through collections of valid and invalid user datasets using standard JavaScript modules.
* **Excel DDT:** Dynamic extraction of test rows from `.xlsx` spreadsheets via `ExcelUtils`.

### 4. Automatic Retries & Flakiness Protection
Configured via `playwright.config.ts` to automatically re-execute failed tests locally or in CI environments (`retries: process.env.CI ? 2 : 1`).

### 5. Automatic Evidence Capture
Playwright records screenshots, failure traces, and video recordings exclusively on failure:
* Traces: `trace: 'retain-on-failure'`
* Screenshots: `screenshot: 'only-on-failure'`
* Videos: `video: 'retain-on-failure'`

---

## 🏗 Architecture

```text
                    ┌─────────────────────────┐
                    │      Test Specs         │
                    │  (*.spec.ts in /tests)  │
                    └────────────┬────────────┘
                                 │
                 ┌───────────────┴───────────────┐
                 ▼                               ▼
      ┌─────────────────────┐        ┌──────────────────────┐
      │   Page Fixtures     │        │   Test Data Sources  │
      │  (Dependency Inj.)  │        │   (JSON / Excel .xlsx)│
      └──────────┬──────────┘        └──────────────────────┘
                 │
                 ▼
      ┌─────────────────────┐
      │   Page Objects      │
      │ (Login, Register etc│
      └──────────┬──────────┘
                 │
                 ▼
      ┌─────────────────────┐
      │      BasePage       │
      │  Common UI Actions  │
      └──────────┬──────────┘
                 │
                 ▼
      ┌─────────────────────┐
      │ Playwright Core API │
      │  Chromium / FF / Edge│
      └─────────────────────┘
```

---

## 📁 Project Structure

```text
playwright-ts-ddt-framework/
│
├── .github/
│   └── workflows/
│       └── playwright.yml            # CI GitHub Actions pipeline
│
├── data/
│   ├── loginData.json                # JSON data for login scenarios
│   └── TutorialsNinjaTestData.xlsx   # Excel data sheets
│
├── src/
│   ├── config/
│   │   └── env.config.ts             # Environment variable loader
│   ├── fixtures/
│   │   └── pageFixtures.ts           # Dependency injection fixtures
│   ├── pages/
│   │   ├── BasePage.ts               # Core reusable actions
│   │   ├── HomePage.ts
│   │   ├── LoginPage.ts
│   │   ├── RegisterPage.ts
│   │   ├── AccountPage.ts
│   │   ├── AccountSuccessPage.ts
│   │   └── SearchPage.ts
│   └── utils/
│       ├── DataUtils.ts              # Dynamic data generators (unique emails, etc.)
│       └── ExcelUtils.ts             # SheetJS Excel file parser
│
├── tests/
│   ├── login.spec.ts                 # JSON & Excel DDT test cases
│   ├── register.spec.ts              # Form validation & registration tests
│   └── search.spec.ts                # Search product test suite
│
├── .env                              # Local configuration overrides
├── package.json                      # Scripts and dependencies
├── playwright.config.ts              # Playwright master settings
├── tsconfig.json                     # TypeScript compiler settings
└── README.md
```

---

## 📋 Prerequisites

* **Node.js**: `v18.x` or `v20.x` or higher
* **npm**: `v9.x` or higher

Check your installations:
```bash
node -v
npm -v
```

---

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd playwright-ts-ddt-framework
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browser binaries & OS dependencies:**
   ```bash
   npx playwright install --with-deps
   ```

---

## ⚙️ Configuration

Global settings are managed in `.env` and loaded via `src/config/env.config.ts`:

```properties
URL=https://tutorialsninja.com/demo/
HEADLESS=true
EXPLICIT_WAIT=10
PAGE_LOAD_TIMEOUT=15
MAX_RETRY_COUNT=1
VALID_EMAIL=mahesh.jadhav@aressindia.net
VALID_PASSWORD=123456789
FIRST_NAME=Mahesh
LAST_NAME=Holkar
TELEPHONE=9878943234
```

---

## 🧪 Data-Driven Testing (DDT)

### JSON Data-Driven Tests
Data is defined in `data/loginData.json`:
```json
{
  "validUsers": [
    {
      "email": "maheshpatil234@gmail.com",
      "password": "12345"
    }
  ]
}
```
Playwright parameterizes tests dynamically at runtime:
```typescript
for (const user of loginData.validUsers) {
  test(`Verify login for ${user.email}`, async ({ homePage }) => {
    const loginPage = await homePage.navigateToLoginPage();
    const accountPage = await loginPage.login(user.email, user.password);
    expect(await accountPage.verifySuccessfulLogin()).toBeTruthy();
  });
}
```

### Excel Data-Driven Tests
Data is read directly from `data/TutorialsNinjaTestData.xlsx` sheet `Login`:
```typescript
const excelUsers = ExcelUtils.getTestData<{ Email: string; Password: string }>(
  'data/TutorialsNinjaTestData.xlsx',
  'Login'
);

for (const row of excelUsers) {
  test(`Verify login via Excel: ${row.Email}`, async ({ homePage }) => {
    const loginPage = await homePage.navigateToLoginPage();
    const accountPage = await loginPage.login(row.Email, row.Password);
    expect(await accountPage.verifySuccessfulLogin()).toBeTruthy();
  });
}
```

---

## ▶️ Running Tests

### Run All Tests
```bash
npm run test
```

### Run Tests in Headed Mode (Browser Visible)
```bash
npm run test:headed
```

### Run by Browser Project
```bash
npm run test:chrome
npm run test:firefox
npm run test:edge
```

### Run by Tags
```bash
# Run only @smoke tagged tests
npm run test:smoke

# Run only @regression tagged tests
npm run test:regression
```

### Run a Single Test File
```bash
npx playwright test tests/login.spec.ts
```

### Debug Tests with Playwright Inspector
```bash
npx playwright test --debug
```

---

## 🧵 Parallel Execution & Worker Isolation

Parallelism in Playwright is enabled out of the box at the file and test level:
* Configured in `playwright.config.ts` via `fullyParallel: true`.
* Each worker process runs in an isolated browser context, avoiding cookie leaks, session pollution, or thread deadlocks.
* Adjust worker concurrency with the `--workers` CLI flag:
  ```bash
  npx playwright test --workers=4
  ```

---

## 📊 HTML Reports & Artifacts

After execution, generate and open the interactive HTML report:

```bash
npm run report
```

The report provides:
* Detailed step-by-step traces with DOM snapshots.
* Automatic video replay of failed scenario runs.
* Full-resolution screenshots captured at the point of failure.
* Error call stacks highlighting the failing locator.

---

## 🔄 CI/CD Integration

A GitHub Actions workflow is provided in `.github/workflows/playwright.yml`. It:
1. Checks out the code.
2. Sets up Node.js with caching.
3. Installs dependencies and browsers.
4. Executes headless tests across configured browser engines.
5. Archives HTML reports as downloadable build artifacts.

---

## 👨‍💻 Author

**Mahesh Holkar**

Automation Engineering  
Playwright | TypeScript | Selenium | BDD | CI/CD