import { test, expect } from '@playwright/test';
import LoginPage from '../../pages/LoginPage';
import UserCredentials from '../../helpers/UserCredentials';
import { ErrorMessages } from '../../helpers/LoginErrorMessages';
import ApplicationURL from '../../helpers/ApplicationURL';

test.describe('Negative login scenarios', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
    });

    test('Login with locked_out_user', async ({ page }) => {
        await loginPage.loginToApplication(UserCredentials.LOCKED_OUT_USER);
        await loginPage.validateErrorMessage(ErrorMessages.LOGIN_WITH_LOCKED_USER)
        await loginPage.validatePageUrl(ApplicationURL.BASE_URL);
    });

    test('Login with incorrect login username', async ({ page }) => {
        await loginPage.loginToApplication('wrongUser');
        await loginPage.validateErrorMessage(ErrorMessages.LOGIN_WITH_WRONG_USER)
        await loginPage.validatePageUrl(ApplicationURL.BASE_URL);
    });

    test('Login with incorrect password', async ({ page }) => {
        await loginPage.loginToApplication(UserCredentials.STANDARD_USER, 'jopa');
        await loginPage.validateErrorMessage(ErrorMessages.LOGIN_WITH_WRONG_PASSWORD)
        await loginPage.validatePageUrl(ApplicationURL.BASE_URL);
    });
});
