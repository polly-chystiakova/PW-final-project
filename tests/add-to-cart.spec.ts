import { test } from '../pages/fixtures/homePage.fixture';
import { expect } from '@playwright/test';

test('@smoke Should add product to cart', async ({ homePage }) => {
  await test.step('Go to homepage and select a product', async () => {
    await homePage.goto();
    await homePage.clickOnProductByName('Slip Joint Pliers');
    await expect(homePage.page).toHaveURL(/\/product/);
    await expect(homePage.productName).toHaveText('Slip Joint Pliers');
    await expect(homePage.getUnitPrice()).toHaveText('9.17');
  });

  await test.step('Add product to cart and verify', async () => {
    await homePage.getAddToCartButton().click();
    await expect(homePage.getSuccessAlert()).toBeVisible();
    await expect(homePage.getCartQuantity()).toHaveText('1');
  });

  await test.step('Go to cart and check product info', async () => {
    await homePage.goToCart();
    await expect(homePage.page).toHaveURL('/checkout');
    await expect(homePage.getCartQuantity()).toHaveText('1');
    await expect(homePage.getProductTitleInCart()).toHaveText('Slip Joint Pliers');
    await expect(homePage.getProceedButton()).toBeVisible();
  });
});