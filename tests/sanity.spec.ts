import { test } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import ApplicationURL from '../helpers/ApplicationURL';
import ProductsPage from '../pages/ProductsPage';
import YourCartPage from '../pages/YourCartPage';
import PageTitles from '../helpers/PageTitles';
import CheckoutYourInfoPage from '../pages/CheckoutYourInfoPage';
import CheckoutOverViewPage from '../pages/CheckoutOverview';
import CheckoutCompletePage from '../pages/CheckoutCompletePage';

test.describe('Sanity test block', ()=> {

  const products = ['Sauce Labs Backpack', 'Sauce Labs Fleece Jacket', 'Sauce Labs Onesie'];

  test('Validate doing simple transaction scenario', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const yourCartPage = new YourCartPage(page);
    const checkoutYourInfo = new CheckoutYourInfoPage(page);
    const checkoutOverviewPage = new CheckoutOverViewPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);
  
    await loginPage.loginToApplication()
    
    await productsPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL);
    await productsPage.validateTitle(PageTitles.INVENTORY_PAGE);
  
    await productsPage.chooseProductByTitle(products[0]);
    await productsPage.chooseProductByTitle(products[1]);
    await productsPage.chooseProductByTitle(products[2]);
  
    await productsPage.validateNumberOfItems(products.length.toString());
    await productsPage.goToCart();
  
    //await page.locator('[data-test="shopping-cart-link"]').click();
    await yourCartPage.validatePageUrl(ApplicationURL.YOUR_CART_PAGE_URL);
    await yourCartPage.validateTitle(PageTitles.YOUR_CART_PAGE);
    await yourCartPage.validateNumberOfItems(products.length);
    await yourCartPage.validateItemExistInCart(products[0]);
    await yourCartPage.validateItemExistInCart(products[1]);
    await yourCartPage.validateItemExistInCart(products[2]);
  
    await yourCartPage.goToCheckout();

    await checkoutYourInfo.validatePageUrl(ApplicationURL.CHECKOUT_YOUR_INFO_PAGE_URL);
    await checkoutYourInfo.validateTitle(PageTitles.CHECKOUT_YOUR_INFO_PAGE);
    await checkoutYourInfo.fillInfo("Gogi", "Gogov", "123456");
    await checkoutYourInfo.goToCheckoutOverview();

    await checkoutOverviewPage.validatePageUrl(ApplicationURL.CHECKOUT_OVERVIEW_PAGE_URL);
    await checkoutOverviewPage.validateTitle(PageTitles.CHECKOUT_OVERVIEW_PAGE);
    await checkoutOverviewPage.clickFinishButton();

    await checkoutCompletePage.validatePageUrl(ApplicationURL.CHECKOUT_COMPLETE_PAGE_URL);
    await checkoutCompletePage.validateTitle(PageTitles.CHECKOUT_COMPLETE_PAGE);
    await checkoutCompletePage.validateFinalMessage('Thank you for your order!');
   
    // await page.locator('[data-test="back-to-products"]').click();
    // await page.getByRole('button', { name: 'Open Menu' }).click();
    // await page.locator('[data-test="reset-sidebar-link"]').click();
    // await page.locator('[data-test="logout-sidebar-link"]').click();
  });
})

