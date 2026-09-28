# Playwright TypeScript Data-Driven Test Automation Framework

An enterprise-grade **End-to-End Test Automation Framework** built with **Playwright, TypeScript, Page Object Model (POM), and Data-Driven Testing (DDT)** using JSON and Excel test data.

The framework targets the **TutorialsNinja Demo Application** and is designed for maintainable UI automation, cross-browser execution, parallel testing, robust synchronization, reusable page objects, comprehensive reporting, and Jenkins-based CI/CD execution.

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Framework Features](#-framework-features)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [Configuration](#%EF%B8%8F-configuration)
- [Data-Driven Testing](#-data-driven-testing-ddt)
- [Running Tests](#-running-tests)
- [Cross-Browser Execution](#-cross-browser-execution)
- [Reports & Failure Evidence](#-reports--failure-evidence)
- [CI/CD with Jenkins](#-cicd-with-jenkins)
- [Git Workflow](#-git-workflow)
- [Best Practices](#-best-practices)
- [Author](#-author)

---

## 🚀 Overview

This framework provides a scalable foundation for modern web UI automation using **Playwright and TypeScript**.

It follows the **Page Object Model** to separate test intent from UI implementation and supports external test data through **JSON and Excel**.

The framework is designed around:

- Maintainable Page Object classes
- Strongly typed TypeScript code
- Playwright auto-waiting
- Web-first assertions
- Cross-browser projects
- Parallel test execution
- JSON-based DDT
- Excel-based DDT
- Custom Playwright fixtures
- Environment-based configuration
- Playwright HTML reporting
- Allure reporting
- Failure screenshots
- Trace and video artifacts
- Jenkins CI/CD integration

Playwright supports multiple browser projects, including Chromium, Firefox, WebKit, Google Chrome, and Microsoft Edge, through `playwright.config.ts`.

---

## 🛠 Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Playwright Test** | Browser automation, test execution, auto-waiting, assertions and reporting |
| **TypeScript** | Strong typing and scalable test development |
| **Page Object Model** | UI abstraction and separation of concerns |
| **XLSX / SheetJS** | Excel test-data processing |
| **JSON** | Structured external test data |
| **dotenv** | Environment configuration |
| **Custom Fixtures** | Dependency injection and reusable test setup |
| **Allure Reporter** | Detailed execution dashboards and historical reporting |
| **Playwright HTML Reporter** | Native execution report with traces and artifacts |
| **Jenkins** | CI/CD pipeline automation |
| **Browsers** | Chromium, Chrome, Firefox, Microsoft Edge |

---

## ✨ Framework Features

### 1. Page Object Model

The framework uses the **Page Object Model (POM)** design pattern.

Each application page has a dedicated class responsible for:

- Locators
- Page navigation
- UI actions
- Page-specific validations
- Reusable business operations

Example page objects:

```text
BasePage
HomePage
LoginPage
RegisterPage
AccountPage
AccountSuccessPage
SearchPage
```

This approach keeps test cases focused on **business behavior** instead of low-level UI implementation.

---

### 2. Web-First Assertions

The framework uses Playwright's asynchronous web-first assertions:

```typescript
await expect(locator).toBeVisible();
```

These assertions automatically wait for the expected condition instead of requiring arbitrary delays.

---

### 3. Auto-Waiting Synchronization

The framework avoids unnecessary:

```typescript
await page.waitForTimeout();
```

Instead, Playwright's built-in synchronization and locator assertions are used wherever possible.

This helps reduce timing-related test failures and improves execution stability.

Playwright provides automatic waiting around actions and web-first assertions as part of its test model.

---

### 4. Data-Driven Testing

The framework supports multiple external data sources:

```text
JSON
Excel
```

This allows test logic to remain independent from test data.

Example:

```text
Test Logic
    │
    ├── JSON Data
    │
    └── Excel Data
```

---

### 5. JSON Data-Driven Testing

Login credentials can be maintained in:

```text
data/loginData.json
```

The framework supports both valid and invalid user datasets.

Example:

```json
{
  "validUsers": [
    {
      "email": "testuser@example.com",
      "password": "Test@123",
      "description": "Standard user"
    }
  ],
  "invalidUsers": [
    {
      "email": "invalid_user@test.com",
      "password": "wrongpassword",
      "expectedError": "Warning: No match for E-Mail Address and/or Password."
    }
  ]
}
```

Tests can iterate through these datasets without duplicating test logic.

---

### 6. Excel Data-Driven Testing

Excel test data is maintained in:

```text
data/TutorialsNinjaTestData.xlsx
```

The login dataset is stored under the:

```text
Login
```

worksheet.

The framework uses the `xlsx` package through:

```text
src/utils/ExcelUtils.ts
```

Example:

```typescript
const excelUsers =
  ExcelUtils.getTestData<{ Email: string; Password: string }>(
    'data/TutorialsNinjaTestData.xlsx',
    'Login'
  );
```

The utility dynamically reads worksheet records rather than relying on hardcoded row or column indexes.

---

### 7. Custom Playwright Fixtures

Reusable test dependencies are provided through custom Playwright fixtures.

```text
src/fixtures/pageFixtures.ts
```

Fixtures provide a clean dependency-injection mechanism for:

- Page Objects
- Browser context
- Shared test setup
- Reusable test dependencies

This keeps test specifications concise and reduces repetitive initialization code.

---

### 8. Cross-Browser Execution

The framework supports execution across:

- Chromium
- Google Chrome
- Firefox
- Microsoft Edge

Playwright projects allow the same test suite to execute against multiple browser configurations.

Example architecture:

```text
                    Test Suite
                        │
          ┌─────────────┼─────────────┐
          │             │             │
          ▼             ▼             ▼
      Chromium       Firefox        Edge
          │             │             │
          └─────────────┼─────────────┘
                        │
                    Test Results
```

---

### 9. Parallel Execution

Playwright Test supports parallel execution through worker processes and browser projects.

This allows the framework to execute tests concurrently while maintaining isolated browser contexts.

Parallel execution can significantly reduce overall suite execution time in CI environments.

---

### 10. Environment-Based Configuration

Runtime configuration is maintained through:

```text
.env
```

Environment-specific values can be loaded through:

```text
src/config/env.config.ts
```

This allows application URLs and execution settings to be changed without modifying test source code.

---

## 🏗 Architecture

The framework follows a layered architecture:

```text
                    ┌────────────────────────┐
                    │      Test Specs        │
                    │ login/register/search  │
                    └───────────┬────────────┘
                                │
                                ▼
                    ┌────────────────────────┐
                    │    Custom Fixtures     │
                    │     Dependency DI      │
                    └───────────┬────────────┘
                                │
                                ▼
                    ┌────────────────────────┐
                    │      Page Objects      │
                    │ Login / Register etc.  │
                    └───────────┬────────────┘
                                │
                                ▼
                    ┌────────────────────────┐
                    │       BasePage         │
                    │ Common UI interactions │
                    └───────────┬────────────┘
                                │
                                ▼
                    ┌────────────────────────┐
                    │   Playwright Browser   │
                    │ Chromium / Firefox /   │
                    │ Chrome / Edge          │
                    └────────────────────────┘
```

Test data is maintained independently:

```text
                    ┌──────────────────────┐
                    │      Test Specs      │
                    └──────────┬───────────┘
                               │
                  ┌────────────┴────────────┐
                  │                         │
                  ▼                         ▼
           loginData.json         TutorialsNinjaTestData.xlsx
                  │                         │
                  └────────────┬────────────┘
                               ▼
                         Test Execution
```

---

## 📁 Project Structure

```text
playwright-ts-ddt-framework/
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── data/
│   ├── loginData.json
│   └── TutorialsNinjaTestData.xlsx
│
├── src/
│   ├── config/
│   │   └── env.config.ts
│   │
│   ├── fixtures/
│   │   └── pageFixtures.ts
│   │
│   ├── pages/
│   │   ├── BasePage.ts
│   │   ├── HomePage.ts
│   │   ├── LoginPage.ts
│   │   ├── RegisterPage.ts
│   │   ├── AccountPage.ts
│   │   ├── AccountSuccessPage.ts
│   │   └── SearchPage.ts
│   │
│   └── utils/
│       ├── DataUtils.ts
│       └── ExcelUtils.ts
│
├── tests/
│   ├── login.spec.ts
│   ├── register.spec.ts
│   └── search.spec.ts
│
├── .env
├── .gitignore
├── Jenkinsfile
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

---

## 📋 Prerequisites

Install the following before running the framework.

### Node.js

Node.js **18 or higher**:

```bash
node -v
```

### npm

npm **9 or higher**:

```bash
npm -v
```

### Git

```bash
git --version
```

### Java

Java is optional for the framework itself.

If the project uses the Allure CLI locally, install a supported Java runtime according to the Allure installation requirements.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd playwright-ts-ddt-framework
```

---

### 2. Install Dependencies

For a reproducible installation using the lock file:

```bash
npm ci
```

---

### 3. Install Playwright Browsers

```bash
npx playwright install --with-deps
```

For a specific browser:

```bash
npx playwright install chromium
```

Playwright officially supports installing browser binaries and required operating-system dependencies through the Playwright CLI.

---

## ⚙️ Configuration

Environment parameters are maintained in:

```text
.env
```

### Example `.env`

```properties
URL=https://tutorialsninja.com/demo/
HEADLESS=true
EXPLICIT_WAIT=10
PAGE_LOAD_TIMEOUT=15
MAX_RETRY_COUNT=1

VALID_EMAIL=<your-valid-email>
VALID_PASSWORD=<your-valid-password>

FIRST_NAME=Mahesh
LAST_NAME=Holkar
TELEPHONE=9878943234
```

> **Security:** Never commit real passwords, credentials, API keys, or other secrets to Git. Keep `.env` in `.gitignore` and provide secrets through Jenkins credentials or environment variables in CI.

---

## 🧪 Data-Driven Testing (DDT)

### JSON Test Data

Location:

```text
data/loginData.json
```

Example:

```json
{
  "validUsers": [
    {
      "email": "testuser@example.com",
      "password": "Test@123",
      "description": "Standard user"
    }
  ],
  "invalidUsers": [
    {
      "email": "invalid_user@test.com",
      "password": "wrongpassword123",
      "expectedError": "Warning: No match for E-Mail Address and/or Password."
    }
  ]
}
```

The test suite can iterate through multiple users without duplicating the underlying test implementation.

---

### Excel Test Data

Location:

```text
data/TutorialsNinjaTestData.xlsx
```

Worksheet:

```text
Login
```

Example:

```typescript
const excelUsers =
  ExcelUtils.getTestData<{ Email: string; Password: string }>(
    'data/TutorialsNinjaTestData.xlsx',
    'Login'
  );
```

The Excel utility handles worksheet parsing and converts records into strongly typed TypeScript objects.

---

## ▶️ Running Tests

### Complete Test Suite

```bash
npm run test
```

Runs the complete suite using the configured Playwright projects.

---

### Headed Execution

```bash
npm run test:headed
```

Runs tests with the browser UI visible.

---

### Chromium / Chrome

```bash
npm run test:chrome
```

---

### Firefox

```bash
npm run test:firefox
```

---

### Microsoft Edge

```bash
npm run test:edge
```

---

### Smoke Tests

```bash
npm run test:smoke
```

Runs tests tagged:

```text
@smoke
```

---

### Regression Tests

```bash
npm run test:regression
```

Runs tests tagged:

```text
@regression
```

---

## 🔎 Direct Playwright Commands

The npm scripts provide convenient shortcuts, but Playwright can also be invoked directly.

Run all tests:

```bash
npx playwright test
```

Run a specific test file:

```bash
npx playwright test tests/login.spec.ts
```

Run a specific browser project:

```bash
npx playwright test --project=firefox
```

Run in headed mode:

```bash
npx playwright test --headed
```

Run with debugging:

```bash
npx playwright test --debug
```

Playwright supports project-specific execution using `--project` and headed/debug execution through its CLI.

---

## 🌐 Cross-Browser Execution

The framework is configured to support multiple browser projects.

Conceptually:

```text
npm run test
      │
      ├── Chromium
      │
      ├── Firefox
      │
      ├── Google Chrome
      │
      └── Microsoft Edge
```

Playwright projects are configured in:

```text
playwright.config.ts
```

Playwright supports both bundled browsers and branded channels such as Chrome and Edge.

---

## 📊 Reports & Failure Evidence

The framework provides two reporting mechanisms:

1. Playwright HTML Report
2. Allure Report

---

### 1. Playwright HTML Report

The native Playwright HTML reporter provides detailed execution information, including test results and failure details. The report can also expose trace information and attached artifacts when configured by the project.

Open the report:

```bash
npm run report
```

Alternatively:

```bash
npx playwright show-report
```

The report can be used to investigate:

- Passed tests
- Failed tests
- Skipped tests
- Browser projects
- Test duration
- Error details
- Screenshots
- Trace artifacts

---

### 2. Allure Report

The framework also integrates Allure for richer reporting and historical execution analysis.

#### Serve the Report

```bash
npm run allure:serve
```

#### Generate a Static Report

```bash
npm run allure:generate
```

#### Open the Generated Report

```bash
npm run allure:open
```

---

## 📸 Failure Evidence

Depending on the Playwright configuration, failed tests can retain artifacts such as:

```text
Screenshot
Trace
Video
Error details
```

A typical failure-debugging flow is:

```text
Test Failure
     │
     ├── Screenshot
     │
     ├── Trace
     │
     ├── Video
     │
     └── Error / Stack Trace
             │
             ▼
       Root Cause Analysis
```

Playwright supports configurable recording options such as screenshots, traces, and video through the test configuration.

---

## 🔄 CI/CD with Jenkins

The project contains:

```text
Jenkinsfile
```

which defines the CI/CD pipeline.

The Jenkins pipeline supports configurable execution parameters such as:

### Browser Selection

```text
all
chromium
firefox
edge
```

### Test Tags

```text
@smoke
@regression
all
```

### Headless Mode

```text
true
false
```

### Parallel Workers

The number of Playwright workers can be adjusted according to the CI environment.

---

## 🔁 Jenkins Pipeline Flow

```text
                    ┌───────────────────┐
                    │      Jenkins      │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │ Build Parameters  │
                    │ Browser / Tags /  │
                    │ Workers / Headless│
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │   npm ci          │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │ Install Browsers  │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │ Playwright Tests  │
                    └─────────┬─────────┘
                              │
                 ┌────────────┴────────────┐
                 ▼                         ▼
        ┌──────────────────┐      ┌──────────────────┐
        │ Playwright HTML  │      │  Allure Results  │
        │     Report       │      │                  │
        └────────┬─────────┘      └────────┬─────────┘
                 │                         │
                 └────────────┬────────────┘
                              ▼
                    ┌───────────────────┐
                    │ Jenkins Artifacts │
                    └───────────────────┘
```

---

## 📦 Jenkins Artifacts

The pipeline is designed to archive execution artifacts such as:

```text
Playwright HTML Report
Allure Report
Screenshots
Traces
Videos
Test Results
```

This allows test evidence to be accessed directly from the Jenkins build.

---

## 📈 CI Execution Example

Example Jenkins execution:

```bash
npm ci

npx playwright install --with-deps

npm run test
```

A browser-specific execution can be configured through the Jenkins parameters.

Example:

```text
Browser: firefox
Tags: @smoke
Headless: true
Workers: 4
```

---

## 📦 Git Workflow

Review repository changes:

```bash
git status
```

Stage the framework:

```bash
git add \
  package.json \
  playwright.config.ts \
  Jenkinsfile \
  src/ \
  tests/ \
  data/ \
  README.md \
  .gitignore
```

Commit:

```bash
git commit -m "docs: update Playwright DDT framework documentation"
```

Push:

```bash
git push origin main
```

---

## 🔐 Git & Secret Management

The following should **not** be committed to source control:

```text
.env
node_modules/
playwright-report/
test-results/
allure-results/
allure-report/
*.log
```

Sensitive values such as:

```text
Passwords
API keys
Access tokens
Production credentials
```

should be injected through environment variables or CI/CD credential management.

---

## 🧱 Best Practices

### Locator Strategy

Prefer resilient, user-facing locators:

```typescript
page.getByRole()
page.getByLabel()
page.getByText()
page.getByTestId()
```

Avoid unnecessarily brittle XPath or CSS selectors where stable semantic locators are available.

---

### Assertions

Prefer Playwright web-first assertions:

```typescript
await expect(page.getByRole('heading')).toBeVisible();
```

rather than manual polling or fixed delays.

---

### Test Independence

Each test should be independently executable and should not depend on the execution order of another test.

---

### Test Data Separation

Keep external test data outside test specifications:

```text
tests/
    ↓
data/
```

This makes test maintenance easier and allows data changes without modifying test logic.

---

### Page Object Responsibility

Page Objects should contain UI interaction and page-specific behavior.

Avoid placing large business workflows or unrelated assertions into `BasePage`.

---

### Environment Separation

Keep environment-specific configuration outside the test implementation:

```text
.env
src/config/env.config.ts
```

This allows the same automation suite to run against different environments.

---

## 📌 Framework Summary

```text
┌─────────────────────────────────────────────┐
│       Playwright TypeScript DDT Framework   │
├─────────────────────────────────────────────┤
│                                             │
│  ✓ TypeScript                              │
│  ✓ Playwright Test                         │
│  ✓ Page Object Model                       │
│  ✓ Custom Fixtures                         │
│  ✓ JSON Data-Driven Testing                │
│  ✓ Excel Data-Driven Testing               │
│  ✓ Chromium Support                        │
│  ✓ Google Chrome Support                   │
│  ✓ Firefox Support                         │
│  ✓ Microsoft Edge Support                  │
│  ✓ Parallel Execution                      │
│  ✓ Auto-Waiting                            │
│  ✓ Web-First Assertions                    │
│  ✓ Environment Configuration               │
│  ✓ Playwright HTML Reports                 │
│  ✓ Allure Reports                          │
│  ✓ Screenshot / Trace / Video Evidence     │
│  ✓ Jenkins CI/CD                           │
│  ✓ Configurable Workers                    │
│  ✓ Smoke & Regression Execution            │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 📋 Quick Reference

| Requirement | Command |
| :--- | :--- |
| Install dependencies | `npm ci` |
| Install browsers | `npx playwright install --with-deps` |
| Run complete suite | `npm run test` |
| Run headed | `npm run test:headed` |
| Run Chrome | `npm run test:chrome` |
| Run Firefox | `npm run test:firefox` |
| Run Edge | `npm run test:edge` |
| Run Smoke | `npm run test:smoke` |
| Run Regression | `npm run test:regression` |
| Open Playwright report | `npm run report` |
| Serve Allure report | `npm run allure:serve` |
| Generate Allure report | `npm run allure:generate` |
| Open Allure report | `npm run allure:open` |
| Debug tests | `npx playwright test --debug` |

---

## 👨‍💻 Author

**Mahesh Holkar**

**Playwright + TypeScript E2E Test Automation Framework**

---

## 📄 License

Add the applicable project license here.

Example:

```text
@MaheshH91
```

