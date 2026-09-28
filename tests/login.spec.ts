// tests/login.spec.ts
import { test, expect } from '../src/fixtures/pageFixtures';
import loginData from '../data/loginData.json';

test.describe('Login Functionality Tests', () => {

    for (const user of loginData.validUsers) {
        test(`Verify login using JSON data: ${user.email} @smoke @regression`, async ({ homePage }) => {
            const loginPage = await homePage.navigateToLoginPage();
            const accountPage = await loginPage.login(user.email, user.password);
            await expect(accountPage.myAccountHeading).toBeVisible();
        });
    }

    for (const user of loginData.invalidUsers) {
        test(`Verify invalid login: ${user.email} @regression`, async ({ homePage }) => {
            const loginPage = await homePage.navigateToLoginPage();
            await loginPage.login(user.email, user.password);
            await expect(loginPage.warningMessage).toContainText(user.expectedError);
        });
    }

    test('Verify login without entering credentials @regression', async ({ homePage }) => {
        const loginPage = await homePage.navigateToLoginPage();
        await loginPage.clickLogin();
        await expect(loginPage.warningMessage).toContainText('Warning: No match for E-Mail Address and/or Password.');
    });
});
