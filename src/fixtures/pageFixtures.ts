// src/fixtures/pageFixtures.ts
import { test as baseTest, expect } from '@playwright/test';
import { ENV } from '../config/env.config';
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
    homePage: async ({ page, context }, use) => {
        // Clear all browser cookies across the context to avoid residual login sessions
        await context.clearCookies();

        const homePage = new HomePage(page);

        // 'commit' finishes as soon as the network response headers arrive,
        // preventing timeouts when demo site assets or trackers take long to download.
        // Explicit 'index.php' avoids ambiguous baseURL root path resolution.
        await page.goto('index.php', {
            waitUntil: 'commit',
            timeout: (Number(ENV.PAGE_LOAD_TIMEOUT) || 30) * 1000,
        });

        // Ensure web storage is clean in case previous tests stored tokens or state
        await page.evaluate(() => {
            try {
                localStorage.clear();
                sessionStorage.clear();
            } catch {
                // Ignore if origin storage access is restricted during initial commit
            }
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
