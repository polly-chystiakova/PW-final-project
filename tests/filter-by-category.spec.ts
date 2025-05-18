import { test } from '../pages/fixtures/homePage.fixture';
import { expect } from '@playwright/test';

test('@smoke Should add product to cart', async ({ homePage }) => {
  await homePage.goto();
  await homePage.clickOnProductByName('Slip Joint Pliers');

  await expect(homePage.page).toHaveURL(/\/product/);
  await expect(homePage.productName).toHaveText('Slip Joint Pliers');
  await expect(homePage.getUnitPrice()).toHaveText('9.17');

  await homePage.getAddToCartButton().click();
  await expect(homePage.getSuccessAlert()).toBeVisible();
  await expect(homePage.getCartQuantity()).toHaveText('1');

  await homePage.goToCart();

  await expect(homePage.page).toHaveURL('/checkout');
  await expect(homePage.getCartQuantity()).toHaveText('1');
  await expect(homePage.getProductTitleInCart()).toHaveText('Slip Joint Pliers');
  await expect(homePage.getProceedButton()).toBeVisible();
});
