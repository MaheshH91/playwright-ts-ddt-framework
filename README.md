# Playwright TypeScript Data-Driven Test Automation Framework

An enterprise-grade **End-to-End Test Automation Framework** built with **Playwright, TypeScript, Page Object Model (POM), and Data-Driven Testing (DDT)** using JSON and Excel test data.

The framework targets the **TutorialsNinja Demo Application** and is designed for maintainable UI automation, cross-browser execution, parallel testing, robust synchronization, reusable page objects, comprehensive reporting, and CI/CD execution via Jenkins and GitHub Actions.

---

## 🛡️ Tools & Technologies Badges

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-24.21.0-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js 24.21.0" />
  <img src="https://img.shields.io/badge/Playwright-1.64.1-45ba4b?style=for-the-badge&logo=playwright&logoColor=white" alt="Playwright 1.64.1" />
  <img src="https://img.shields.io/badge/TypeScript-5.7.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript 5.7.3" />
  <img src="https://img.shields.io/badge/JavaScript-Test_Data_Utilities-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript utilities" />
  <img src="https://img.shields.io/badge/npm-Package_Manager-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="npm" />
  <img src="https://img.shields.io/badge/Page_Object_Model-POM-6A5ACD?style=for-the-badge" alt="Page Object Model" />
  <img src="https://img.shields.io/badge/Data--Driven_Testing-DDT-008080?style=for-the-badge" alt="Data-Driven Testing" />
  <img src="https://img.shields.io/badge/JSON-Test_Data-000000?style=for-the-badge&logo=json&logoColor=white" alt="JSON test data" />
  <img src="https://img.shields.io/badge/Excel-XLSX-217346?style=for-the-badge&logo=microsoftexcel&logoColor=white" alt="Excel test data" />
  <img src="https://img.shields.io/badge/dotenv-Environment_Config-ECD53F?style=for-the-badge&logo=dotenv&logoColor=black" alt="dotenv" />
  <img src="https://img.shields.io/badge/Allure-Reports-FF6A00?style=for-the-badge&logo=allure&logoColor=white" alt="Allure reporting" />
  <img src="https://img.shields.io/badge/HTML_Report-Playwright-2E8B57?style=for-the-badge&logo=html5&logoColor=white" alt="Playwright HTML report" />
  <img src="https://img.shields.io/badge/Git-Version_Control-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git" />
  <img src="https://img.shields.io/badge/GitHub-Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white" alt="GitHub Actions CI" />
  <img src="https://img.shields.io/badge/Jenkins-Pipeline-D24939?style=for-the-badge&logo=jenkins&logoColor=white" alt="Jenkins Pipeline" />
  <img src="https://img.shields.io/badge/Chromium-Browser-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Chromium" />
  <img src="https://img.shields.io/badge/Google_Chrome-Browser-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Google Chrome" />
  <img src="https://img.shields.io/badge/Mozilla_Firefox-Browser-FF7139?style=for-the-badge&logo=firefoxbrowser&logoColor=white" alt="Mozilla Firefox" />
  <img src="https://img.shields.io/badge/Microsoft_Edge-Browser-0078D7?style=for-the-badge&logo=microsoftedge&logoColor=white" alt="Microsoft Edge" />
  <img src="https://img.shields.io/badge/WebKit-Browser_Engine-000000?style=for-the-badge&logo=safari&logoColor=white" alt="WebKit" />
  <img src="https://img.shields.io/badge/TutorialsNinja-Demo_Application-4B5563?style=for-the-badge" alt="TutorialsNinja demo application" />
</p>

---

## 📌 Table of Contents

* [Overview](https://www.google.com/search?q=%23-overview)
* [Tools & Technologies](https://www.google.com/search?q=%23-tools--technologies)
* [Framework Features](https://www.google.com/search?q=%23-framework-features)
* [Architecture](https://www.google.com/search?q=%23-architecture)
* [Project Structure](https://www.google.com/search?q=%23-project-structure)
* [Prerequisites](https://www.google.com/search?q=%23-prerequisites)
* [Getting Started](https://www.google.com/search?q=%23-getting-started)
* [Configuration](https://www.google.com/search?q=%23%25EF%25B8%258F-configuration)
* [Data-Driven Testing (DDT)](https://www.google.com/search?q=%23-data-driven-testing-ddt)
* [Running Tests](https://www.google.com/search?q=%23-running-tests)
* [Cross-Browser Execution](https://www.google.com/search?q=%23-cross-browser-execution)
* [Reports & Failure Evidence](https://www.google.com/search?q=%23-reports--failure-evidence)
* [CI/CD Pipelines](https://www.google.com/search?q=%23-cicd-pipelines)
* [Git Workflow](https://www.google.com/search?q=%23-git-workflow)
* [Best Practices](https://www.google.com/search?q=%23-best-practices)
* [Author](https://www.google.com/search?q=%23-author)
* [License](https://www.google.com/search?q=%23-license)

---

## 🚀 Overview

This framework provides a scalable foundation for modern web UI automation using **Playwright and TypeScript**.

It follows the **Page Object Model** to separate test intent from UI implementation and supports external test data through **JSON and Excel**.

The framework is designed around:

* Maintainable Page Object classes
* Strongly typed TypeScript code
* Playwright auto-waiting
* Web-first assertions
* Cross-browser projects
* Parallel test execution
* JSON-based DDT
* Excel-based DDT
* Custom Playwright fixtures
* Environment-based configuration
* Standalone Playwright HTML reporting
* Allure reporting
* Failure screenshots, traces, and video artifacts
* Jenkins & GitHub Actions CI/CD with automated email reports

---

## 🛠 Tools & Technologies

| Technology | Category | Purpose |
| --- | --- | --- |
| **Playwright Test** | Test Automation | Browser automation, test execution, auto-waiting, and native assertion engine |
| **TypeScript** | Core Language | Type-safe, scalable object-oriented test scripting |
| **Page Object Model** | Design Pattern | Abstraction of web UI elements and operational behaviors |
| **XLSX / SheetJS** | Test Data | Dynamic Excel spreadsheet workbook and worksheet data parsing |
| **JSON** | Test Data | External hierarchical test data management |
| **dotenv** | Configuration | Environment-specific variable management |
| **Custom Fixtures** | Architecture | Dependency injection and reusable lifecycle test setup |
| **Allure Reporter** | Reporting | Interactive dashboards with historical test execution analytics |
| **Playwright HTML Reporter** | Reporting | Standalone single-file HTML reports and trace viewers |
| **Jenkins** | CI/CD | Parameterized declarative pipeline test orchestration |
| **GitHub Actions** | CI/CD | Containerized headless test runner with email reporting |
| **Email-ext / Action-Send-Mail** | Notifications | Automated test result emails with standalone HTML report distribution |
| **Browsers** | Runtime Engines | Chromium, Google Chrome, Mozilla Firefox, Microsoft Edge, WebKit |

---

## ✨ Framework Features

### 1. Page Object Model

The framework uses the **Page Object Model (POM)** design pattern.

Each application page has a dedicated class responsible for:

* Locators
* Page navigation
* UI actions
* Page-specific validations
* Reusable business operations

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

---

### 4. Data-Driven Testing

The framework supports multiple external data sources:

```text
JSON
Excel

```

This allows test logic to remain independent from test data.

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

The login dataset is stored under the `Login` worksheet.

The framework uses the `xlsx` package through:

```text
src/utils/ExcelUtils.ts

```

Example:

```typescript
const excelUsers = ExcelUtils.getTestData<{ Email: string; Password: string }>(
  'data/TutorialsNinjaTestData.xlsx',
  'Login'
);

```

The utility dynamically reads worksheet records rather than relying on hardcoded row or column indexes.

---

### 7. Custom Playwright Fixtures

Reusable test dependencies are provided through custom Playwright fixtures:

```text
src/fixtures/pageFixtures.ts

```

Fixtures provide a clean dependency-injection mechanism for:

* Page Objects
* Browser context
* Shared test setup
* Reusable test dependencies

This keeps test specifications concise and reduces repetitive initialization code.

---

### 8. Cross-Browser Execution

The framework supports execution across:

* Chromium
* Google Chrome
* Firefox
* Microsoft Edge

Playwright projects allow the same test suite to execute against multiple browser configurations.

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

Playwright Test supports parallel execution through worker processes and browser projects. This allows the framework to execute tests concurrently while maintaining isolated browser contexts.

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
                    │       Test Specs       │
                    │ login/register/search  │
                    └───────────┬────────────┘
                                │
                                ▼
                    ┌────────────────────────┐
                    │     Custom Fixtures    │
                    │      Dependency DI     │
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
                    │        BasePage        │
                    │ Common UI interactions │
                    └───────────┬────────────┘
                                │
                                ▼
                    ┌────────────────────────┐
                    │    Playwright Engine   │
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
           loginData.json       TutorialsNinjaTestData.xlsx
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
│       ├── ExcelUtils.ts
│       └── allureEnvSetup.ts
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

Install the following before running the framework:

* **Node.js:** `v24.x` (or `>= 18.x`)
* **npm:** `v9.x` or higher
* **Git:** Latest version
* **Java (Optional):** Required only if running the Allure CLI command-line tool locally.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/MaheshH91/playwright-ts-ddt-framework.git
cd playwright-ts-ddt-framework

```

---

### 2. Install Dependencies

```bash
npm ci

```

---

### 3. Install Playwright Browsers

```bash
npx playwright install --with-deps

```

---

## ⚙️ Configuration

Environment parameters are maintained in `.env`:

```properties
URL=https://tutorialsninja.com/demo/
HEADLESS=true
EXPLICIT_WAIT=10
PAGE_LOAD_TIMEOUT=15
MAX_RETRY_COUNT=1

VALID_EMAIL=your_email@example.com
VALID_PASSWORD=your_password

FIRST_NAME=Mahesh
LAST_NAME=Holkar
TELEPHONE=9878943234

```

> **Security Note:** Never commit actual credentials, passwords, or access tokens to version control. The `.env` file is excluded via `.gitignore`.

---

## 🧪 Data-Driven Testing (DDT)

### JSON Test Data

Located in `data/loginData.json`:

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

---

### Excel Test Data

Located in `data/TutorialsNinjaTestData.xlsx` under the `Login` sheet:

```typescript
const excelUsers = ExcelUtils.getTestData<{ Email: string; Password: string }>(
  'data/TutorialsNinjaTestData.xlsx',
  'Login'
);

```

---

## ▶️ Running Tests

### Complete Suite

```bash
npm run test

```

### Headed Mode

```bash
npm run test:headed

```

### Browser-Specific Runs

```bash
npm run test:chrome
npm run test:firefox
npm run test:edge

```

### Tagged Runs

```bash
npm run test:smoke
npm run test:regression

```

### Direct Playwright Commands

```bash
# Run all tests
npx playwright test

# Run a specific spec
npx playwright test tests/login.spec.ts

# Run with debugger
npx playwright test --debug

```

---

## 🌐 Cross-Browser Execution

Configured via `playwright.config.ts`:

* **Chromium:** Default headless browser engine
* **Google Chrome:** Branded channel (`channel: 'chrome'`)
* **Firefox:** Gecko engine
* **Microsoft Edge:** Branded channel (`channel: 'msedge'`)
* **WebKit:** Safari rendering engine

---

## 📊 Reports & Failure Evidence

### 1. Playwright HTML Report

Includes step-by-step actions, screenshots, and embedded traces:

```bash
npm run report
# or
npx playwright show-report

```

### 2. Allure Report

```bash
# Generate and serve live Allure report
npm run allure:serve

# Build static report
npm run allure:generate

# Open existing static report
npm run allure:open

```

### Failure Evidence Flow

```text
Test Failure
     │
     ├── Screenshot (only-on-failure)
     │
     ├── Video (retain-on-failure)
     │
     └── Playwright Trace (retain-on-failure)
             │
             ▼
      Root Cause Analysis

```

---

## 🔄 CI/CD Pipelines

### 1. Jenkins Pipeline (`Jenkinsfile`)

Parameterized pipeline configured with:

* `PROJECT`: Choice parameter (`all`, `chromium`, `firefox`, `edge`)
* `TAG`: Filter parameter (`all`, `@smoke`, `@regression`)
* `HEADLESS`: Boolean toggle
* `WORKERS`: Configurable parallel worker count
* `RECIPIENTS`: Comma-separated email list
* Automated report archiving for Allure and Playwright HTML
* Automated styled HTML notification emails dispatched via the Jenkins Email Extension plugin

### 2. GitHub Actions (`.github/workflows/playwright.yml`)

* Runs on `ubuntu-latest` with Node.js 24
* Non-interactive Playwright and browser installation (`--with-deps`)
* Google Chrome installation on Linux runners
* Artifact uploads with 30-day retention
* Test outcome email dispatch with attached standalone HTML report via `dawidd6/action-send-mail`

---

## 📦 Git Workflow

```bash
# Check status
git status

# Stage changes
git add .

# Commit
git commit -m "docs: update comprehensive framework documentation"

# Push to repository
git push origin main

```

---

## 🔐 Git & Secret Management

Do not commit the following files:

```text
.env
node_modules/
playwright-report/
test-results/
allure-results/
allure-report/
*.zip
*.log

```

---

## 🧱 Best Practices

* **Semantic Locators:** Use user-facing locators (`page.getByRole()`, `page.getByLabel()`, `page.getByText()`, `page.getByTestId()`) instead of fragile XPaths.
* **Web-First Assertions:** Use `expect(locator).toBeVisible()` to leverage automatic polling.
* **Test Independence:** Ensure each test sets up its own preconditions and runs independently.
* **Data Externalization:** Maintain datasets in external JSON and Excel files.
* **Single Page Responsibility:** Encapsulate only UI locators and interactions in Page Objects.

---

## 👨‍💻 Author

**Mahesh Holkar**

*Senior Automation Test Engineer (SDET)*

* **LinkedIn:** [maheshholkarqaengineer](https://www.linkedin.com/in/maheshholkarqaengineer/)
* **GitHub:** [@MaheshH91](https://www.google.com/search?q=https://github.com/MaheshH91)
* **Repository:** [playwright-ts-ddt-framework](https://github.com/MaheshH91/playwright-ts-ddt-framework.git)

---

## 📄 License

This project is licensed under the [MIT License](https://www.google.com/search?q=LICENSE).