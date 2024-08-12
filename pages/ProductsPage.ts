import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export default class ProductsPage extends BasePage {

    private itemDescriptionElement: Locator;
    private shooppingCartElelemnt

    constructor(protected page: Page) {
        super(page);
        this.itemDescriptionElement = this.page.locator('[class="inventory_item_description"]');
        this.shooppingCartElelemnt = this.page.locator('a[class="shopping_cart_link"]');
    }
    // public async chooseProductByTitle(expectedProductTitleElement: string) {
    //     for (let product of await this.itemDescriptionElement.all()) {
    //         const productTitle = await product.locator('[class="inventory_item_name "]').innerText();
    //         if (productTitle === expectedProductTitleElement) {
    //             await product.locator('button').click();
    //         }
    //     }
    // }

    public async chooseProductByTitle(expectedProductTitle: string) {
        await this.itemDescriptionElement.filter({hasText: expectedProductTitle}).locator('button').click();

        // for (let product of await this.itemDescriptionElement.all()) {
        //     const productTitle = await product.locator('[class="inventory_item_name "]').innerText();
        //     if (productTitle === expectedProductTitle) {
        //         await product.locator('button').click();
        //     }
        // }
    }

    public async validateNumberOfItems(expectednumberOfItems: string) {
        await this.validateElementText(this.shooppingCartElelemnt, expectednumberOfItems);
    }

    public async goToCart() {
        await this.clickElement(this.shooppingCartElelemnt);
    }

}