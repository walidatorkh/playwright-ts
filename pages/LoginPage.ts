import { expect, Locator, Page } from "@playwright/test";
import UserCredentials from "../helpers/UserCredentials";
import ApplicationURL from "../helpers/ApplicationURL";

export default class LoginPage {

    usernameField: Locator;
    passwordField: Locator;
    loginButon: Locator;


    constructor(protected page: Page) {
        this.usernameField = this.page.locator('[data-test="username"]');
        this.passwordField = this.page.locator('[data-test="password"]');
        this.loginButon = this.page.locator('[data-test="login-button"]');
    }


    public async loginToApplication(username: string = UserCredentials.STANDARD_USER, 
        password: string = UserCredentials.CORRECT_PASSWORD, 
        url: string = ApplicationURL.BASE_URL) {
        await this.page.goto(url);
        await this.validatePageUrl(ApplicationURL.BASE_URL);
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButon.click();
        //await this.validatePageUrl(`${ApplicationURL.BASE_URL}inventory.html`)
    }

    public async validatePageUrl(url: string){
        await expect(this.page).toHaveURL(url);
    }
}