import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";



export default class CheckoutYourInfoPage extends BasePage {

    private firstNameTextField: Locator;
    private secondNameTextField: Locator;
    private postalCodeTextField: Locator;
    private continueButton: Locator;

    constructor(protected page: Page) {
        super(page);
        this.firstNameTextField = this.page.locator('[data-test="firstName"]');
        this.secondNameTextField = this.page.locator('[data-test="lastName"]');
        this.postalCodeTextField = this.page.locator('[data-test="postalCode"]');
        this.continueButton = this.page.locator('[data-test="continue"]');
    }

    public async fillInfo(firstName: string, secondName: string, postalCode: string) {
        await this.fillText(this.firstNameTextField, firstName);
        await this.fillText(this.secondNameTextField, secondName);
        await this.fillText(this.postalCodeTextField, postalCode);
    }

    public async goToCheckoutOverview() {
        await this.clickElement(this.continueButton);
    }


}