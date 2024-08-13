import { test } from '@playwright/test';
import LoginPage from '../../pages/LoginPage';
import { ErrorMessages } from '../../helpers/LoginErrorMessages';
import ApplicationURL from '../../helpers/ApplicationURL';


test.describe('Negative login scenarios', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        
    });

    test('Login with locked_out_user', async () => {
        await loginPage.loginToApplication(process.env.LOCKED_OUT_USER);
        await loginPage.validateErrorMessage(ErrorMessages.LOGIN_WITH_LOCKED_USER)
        await loginPage.validatePageUrl(ApplicationURL.BASE_URL);
    });

    test('Login with incorrect login username', async () => {
        await loginPage.loginToApplication('wrongUser');
        await loginPage.validateErrorMessage(ErrorMessages.LOGIN_WITH_WRONG_USER)
        await loginPage.validatePageUrl(ApplicationURL.BASE_URL);
    });

    test('Login with incorrect password', async () => {
        await loginPage.loginToApplication(process.env.STANDARD_USER, 'jopa');
        await loginPage.validateErrorMessage(ErrorMessages.LOGIN_WITH_WRONG_PASSWORD)
        await loginPage.validatePageUrl(ApplicationURL.BASE_URL);
    });
});
