import { expect, Locator, Page } from "@playwright/test";
import ApplicationURL from "../helpers/ApplicationURL";
import { ErrorMessages } from "../helpers/LoginErrorMessages";
import { BasePage } from "./BasePage";

export default class LoginPage extends BasePage {

    private usernameField: Locator;
    private passwordField: Locator;
    private loginButon: Locator;
    private errorMessage: Locator;


    constructor(protected page: Page) {
        super(page)
        this.usernameField = this.page.locator('[data-test="username"]');
        this.passwordField = this.page.locator('[data-test="password"]');
        this.loginButon = this.page.locator('[data-test="login-button"]');
        this.errorMessage = this.page.locator('[data-test="error"]');

    }


    public async loginToApplication(username = process.env.STANDARD_USER as string,
        password = process.env.CORRECT_PASSWORD as string,
        url: string = ApplicationURL.BASE_URL) {
        await this.page.goto(url);
        await this.validatePageUrl(ApplicationURL.BASE_URL);
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.clickElement(this.loginButon);
        //await this.validatePageUrl(`${ApplicationURL.BASE_URL}inventory.html`)
    }

    public async validateErrorMessage(errorMessage: ErrorMessages) {
        await this.validateElementText(this.errorMessage, errorMessage.valueOf())
    }
}