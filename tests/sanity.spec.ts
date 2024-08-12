import { test } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import ApplicationURL from '../helpers/ApplicationURL';
import ProductsPage from '../pages/ProductsPage';
import YourCartPage from '../pages/YourCartPage';

test('sanity test', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const yourCartPage = new YourCartPage(page);

  await loginPage.loginToApplication()
  
  await productsPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL);
  await productsPage.validateTitle("Products");

  await productsPage.chooseProductByTitle('Sauce Labs Backpack');
  await productsPage.chooseProductByTitle('Sauce Labs Fleece Jacket');
  await productsPage.chooseProductByTitle('Sauce Labs Onesie');

  await productsPage.validateNumberOfItems("3");
  await productsPage.goToCart();

  //await page.locator('[data-test="shopping-cart-link"]').click();
  await yourCartPage.validatePageUrl(ApplicationURL.YOUR_CART_PAGE_URL);
  await yourCartPage.validateTitle("Your Cart");

  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('Goga');
  await page.locator('[data-test="firstName"]').press('Tab');
  await page.locator('[data-test="lastName"]').fill('Gogi');
  await page.locator('[data-test="lastName"]').press('Tab');
  await page.locator('[data-test="postalCode"]').fill('123456');
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="finish"]').click();
  await page.locator('[data-test="back-to-products"]').click();
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="reset-sidebar-link"]').click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
});

test('test validate products title', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginToApplication(process.env.PERFORMANCE_GLITCH_USER);
    const productsPage = new ProductsPage(page);
    await productsPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL);
    await productsPage.validateTitle("Products");
});

