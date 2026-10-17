// src/pages/HomePage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';
import { SearchPage } from './SearchPage';

export class HomePage extends BasePage {
    readonly myAccountDropMenu: Locator;
    readonly loginOption: Locator;
    readonly logoutOption: Locator;
    readonly registerOption: Locator;
    readonly searchBoxField: Locator;
    readonly searchButton: Locator;

    constructor(page: Page) {
        super(page);
        this.myAccountDropMenu = page.locator('a[title="My Account"]');
        this.loginOption = page.locator('ul.dropdown-menu a:has-text("Login")');
        this.logoutOption = page.locator('ul.dropdown-menu a:has-text("Logout"), aside#column-right a:has-text("Logout")');
        this.registerOption = page.locator('ul.dropdown-menu a:has-text("Register")');
        // Match both standalone search input and nested #search container
        this.searchBoxField = page.locator('#search input[name="search"], input[name="search"]');
        this.searchButton = page.locator('#search button, #search .btn-default');
    }

    async navigateToLoginPage(): Promise<LoginPage> {
        // Step 1: If already logged in on an account page with a visible sidebar logout link, click it
        if (await this.logoutOption.first().isVisible()) {
            await this.logoutOption.first().click();
        }

        try {
            await this.myAccountDropMenu.click({ timeout: 3000 });

            // Step 2: If the dropdown menu shows "Logout" instead of "Login", clear the active session
            if (await this.logoutOption.first().isVisible()) {
                await this.logoutOption.first().click();
                await this.myAccountDropMenu.click({ timeout: 3000 });
            }

            await this.loginOption.click({ timeout: 3000 });
        } catch {
            await this.page.goto('index.php?route=account/login', { waitUntil: 'domcontentloaded' });
        }

        const loginPage = new LoginPage(this.page);
        await loginPage.emailField.waitFor({ state: 'visible', timeout: 10000 });
        return loginPage;
    }

    async navigateToRegisterPage(): Promise<RegisterPage> {
        // Clear active session if on an account page
        if (await this.logoutOption.first().isVisible()) {
            await this.logoutOption.first().click();
        }

        try {
            await this.myAccountDropMenu.click({ timeout: 3000 });
            if (await this.logoutOption.first().isVisible()) {
                await this.logoutOption.first().click();
                await this.myAccountDropMenu.click({ timeout: 3000 });
            }
            await this.registerOption.click({ timeout: 3000 });
        } catch {
            await this.page.goto('index.php?route=account/register', { waitUntil: 'domcontentloaded' });
        }
        return new RegisterPage(this.page);
    }

    async searchProduct(productName: string): Promise<SearchPage> {
        await this.searchBoxField.waitFor({ state: 'visible', timeout: 10000 });
        await this.searchBoxField.fill(productName);
        await this.searchButton.click();
        return new SearchPage(this.page);
    }

    async clickSearchButton(): Promise<SearchPage> {
        await this.searchButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.searchButton.click();
        return new SearchPage(this.page);
    }
}
