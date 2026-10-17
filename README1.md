# Playwright TypeScript Data-Driven Test Automation Framework

An enterprise-grade **End-to-End Test Automation Framework** built with
**Playwright, TypeScript, Page Object Model (POM), and Data-Driven
Testing (DDT)** using JSON and Excel test data.

The framework targets the **TutorialsNinja Demo Application** and is
designed for maintainable UI automation, cross-browser execution,
parallel testing, robust synchronization, reusable page objects,
comprehensive reporting, and CI/CD execution via **GitHub Actions** and
**Jenkins**.

------------------------------------------------------------------------

## 📌 Table of Contents

-   [Overview](#-overview)
-   [Tech Stack](#-tech-stack)
-   [Framework Features](#-framework-features)
-   [Architecture](#-architecture)
-   [Project Structure](#-project-structure)
-   [Prerequisites](#-prerequisites)
-   [Getting Started](#-getting-started)
-   [Configuration](#-configuration)
-   [Data-Driven Testing (DDT)](#-data-driven-testing-ddt)
-   [Running Tests](#-running-tests)
-   [Cross-Browser Execution](#-cross-browser-execution)
-   [Reports & Failure Evidence](#-reports--failure-evidence)
-   [CI/CD Pipelines](#-cicd-pipelines)
    -   [GitHub Actions](#github-actions)
    -   [Jenkins](#jenkins)
-   [Git Workflow](#-git-workflow)
-   [Best Practices](#-best-practices)
-   [Author](#-author)

------------------------------------------------------------------------

## 🚀 Overview

This framework provides a scalable foundation for modern web UI
automation using **Playwright and TypeScript**.

It follows the **Page Object Model** to separate test intent from UI
implementation and supports external test data through **JSON and
Excel**.

The framework is designed around:

-   Maintainable Page Object classes
-   Strongly typed TypeScript code
-   Custom Playwright fixtures for dependency injection
-   Web-first assertions and auto-waiting
-   Cross-browser projects (**Chromium, Chrome, Firefox, WebKit, Edge**)
-   Parallel test execution
-   JSON-based and Excel-based DDT
-   Dynamic and environment-driven configuration via `dotenv`
-   Native Playwright HTML reporting and Allure reporting
-   Failure screenshots, execution traces, and video artifacts
-   GitHub Actions and Jenkins CI/CD integration

------------------------------------------------------------------------

## 🛠 Tech Stack

  --------------------------------------------------------------------------
  Technology                          Purpose
  ----------------------------------- --------------------------------------
  **Playwright Test**                 Browser automation, test execution,
                                      auto-waiting, assertions, and
                                      reporting

  **TypeScript**                      Static typing and scalable test
                                      development

  **Page Object Model**               UI abstraction and separation of
                                      concerns

  **XLSX / SheetJS**                  Excel test-data processing
                                      (`TutorialsNinjaTestData.xlsx`)

  **JSON**                            Structured test-data feed
                                      (`loginData.json`)

  **dotenv**                          Environment-based runtime
                                      configuration

  **Custom Fixtures**                 Clean dependency injection and
                                      isolated page instance management

  **Allure Reporter**                 Rich execution dashboards and history

  **Playwright HTML Reporter**        Native execution reports with traces,
                                      screenshots, and videos

  **CI/CD**                           GitHub Actions
                                      (`.github/workflows/playwright.yml`) &
                                      Jenkins (`Jenkinsfile`)

  **Browsers**                        Chromium, Google Chrome, Mozilla
                                      Firefox, WebKit (Safari), Microsoft
                                      Edge
  --------------------------------------------------------------------------

------------------------------------------------------------------------

## ✨ Framework Features

### 1. Page Object Model (POM)

Each application page has a dedicated class extending `BasePage`: -
`BasePage.ts`: Reusable driver actions (`click`, `type`, `getText`,
`isElementVisible`, `navigate`). - `HomePage.ts`: Navigation headers,
drop-downs, and search bar interactions. - `LoginPage.ts`: User
authentication inputs and error banner verifications. -
`RegisterPage.ts`: New account registration forms, newsletter toggles,
and validation error messages. - `AccountPage.ts` &
`AccountSuccessPage.ts`: Post-authentication landings and account status
checks. - `SearchPage.ts`: Product catalog results and no-match
notifications.

### 2. Custom Fixtures for Clean Dependency Injection

Instead of manually initializing page objects in every test,
`src/fixtures/pageFixtures.ts` extends Playwright's base test with
pre-instantiated page objects and handles base landing navigation:
