import { test, expect } from '../src/fixtures/pageFixtures';
import { DataUtils } from '../src/utils/DataUtils';
import { ENV } from '../src/config/env.config';

test.describe('Register Account Tests', () => {

    test('Verify registering with mandatory fields @smoke @regression', async ({ homePage }) => {
        const registerPage = await homePage.navigateToRegisterPage();
        const successPage = await registerPage.registerMandatory({
            firstName: ENV.FIRST_NAME,
            lastName: ENV.LAST_NAME,
            email: DataUtils.generateUniqueEmail(),
            phone: ENV.TELEPHONE,
            password: ENV.VALID_PASSWORD
        });

        const heading = await successPage.getAccountSuccessHeading();
        expect(heading).toBe('Your Account Has Been Created!');
    });

    test('Verify duplicate email registration alert @regression', async ({ homePage }) => {
        const registerPage = await homePage.navigateToRegisterPage();
        await registerPage.registerFull({
            firstName: ENV.FIRST_NAME,
            lastName: ENV.LAST_NAME,
            email: ENV.VALID_EMAIL,
            phone: ENV.TELEPHONE,
            password: ENV.VALID_PASSWORD,
            subscribeNewsletter: true
        });

        const warning = await registerPage.getAlertWarningText();
        expect(warning).toContain('Warning: E-Mail Address is already registered!');
    });

    test('Verify validation warnings on blank form submission @regression', async ({ homePage }) => {
        const registerPage = await homePage.navigateToRegisterPage();
        await registerPage.clickContinue();

        await expect(registerPage.alertWarning).toContainText('Warning: You must agree to the Privacy Policy!');
        await expect(registerPage.firstNameError).toContainText('First Name must be between 1 and 32 characters!');
        await expect(registerPage.lastNameError).toContainText('Last Name must be between 1 and 32 characters!');
        await expect(registerPage.emailError).toContainText('E-Mail Address does not appear to be valid!');
        await expect(registerPage.telephoneError).toContainText('Telephone must be between 3 and 32 characters!');
        await expect(registerPage.passwordError).toContainText('Password must be between 4 and 20 characters!');
    });
});
