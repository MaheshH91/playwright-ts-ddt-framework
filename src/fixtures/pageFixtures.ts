import { test as baseTest } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { SearchPage } from '../pages/SearchPage';

type Pages = {
    homePage: HomePage;
    loginPage: LoginPage;
    registerPage: RegisterPage;
    searchPage: SearchPage;
};

export const test = baseTest.extend<Pages>({
    homePage: async ({ page }, use) => {
        // 'domcontentloaded' avoids hanging on slow tracking/asset scripts on TutorialsNinja
        // Using '' or './' resolves correctly to the baseURL with the /demo/ path
        await page.goto('./', { waitUntil: 'domcontentloaded' });
        await use(new HomePage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    registerPage: async ({ page }, use) => {
        await use(new RegisterPage(page));
    },
    searchPage: async ({ page }, use) => {
        await use(new SearchPage(page));
    }
});

export { expect } from '@playwright/test';
