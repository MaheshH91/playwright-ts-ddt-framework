import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';
import { SearchPage } from './SearchPage';

export class HomePage extends BasePage {
    readonly myAccountDropMenu: Locator;
    readonly loginOption: Locator;
    readonly registerOption: Locator;
    readonly searchBoxField: Locator;
    readonly searchButton: Locator;

    constructor(page: Page) {
        super(page);
        this.myAccountDropMenu = page.locator('a[title="My Account"]');
        this.loginOption = page.locator('ul.dropdown-menu a:has-text("Login")');
        this.registerOption = page.locator('ul.dropdown-menu a:has-text("Register")');
        this.searchBoxField = page.locator('input[name="search"]');
        this.searchButton = page.locator('#search button');
    }

    async navigateToLoginPage(): Promise<LoginPage> {
        try {
            await this.myAccountDropMenu.click({ timeout: 3000 });
            await this.loginOption.click({ timeout: 3000 });
        } catch {
            // Notice: NO leading slash. Resolves to https://tutorialsninja.com/demo/index.php...
            await this.page.goto('index.php?route=account/login', { waitUntil: 'domcontentloaded' });
        }
        const loginPage = new LoginPage(this.page);
        await loginPage.emailField.waitFor({ state: 'visible', timeout: 10000 });
        return loginPage;
    }

    async navigateToRegisterPage(): Promise<RegisterPage> {
        try {
            await this.myAccountDropMenu.click({ timeout: 3000 });
            await this.registerOption.click({ timeout: 3000 });
        } catch {
            // Notice: NO leading slash.
            await this.page.goto('index.php?route=account/register', { waitUntil: 'domcontentloaded' });
        }
        return new RegisterPage(this.page);
    }

    async searchProduct(productName: string): Promise<SearchPage> {
        await this.searchBoxField.fill(productName);
        await this.searchButton.click();
        return new SearchPage(this.page);
    }

    async clickSearchButton(): Promise<SearchPage> {
        await this.searchButton.click();
        return new SearchPage(this.page);
    }
}
