// src/fixtures/pageFixtures.ts
import { test as baseTest, expect } from '@playwright/test';

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
        const homePage = new HomePage(page);

        // Use '' or 'index.php' to preserve https://tutorialsninja.com/demo/
        await page.goto('', {
            waitUntil: 'domcontentloaded',
        });

        await use(homePage);
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    registerPage: async ({ page }, use) => {
        await use(new RegisterPage(page));
    },

    searchPage: async ({ page }, use) => {
        await use(new SearchPage(page));
    },
});

export { expect };
