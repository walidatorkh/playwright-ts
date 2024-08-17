import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export default class CheckoutCompletePage extends BasePage {

    private thanksMessageElement: Locator;
    private backHomeButton: Locator;
    constructor(protected page: Page) {
        super(page);
        this.thanksMessageElement = page.locator('[class="complete-header"]');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');
    }

    public async validateFinalMessage(expectedMessage: string) {
        await this.validateElementText(this.thanksMessageElement, expectedMessage);
    }

    public async goBackToProducts() {
        await this.clickElement(this.backHomeButton);
    }
}