import { test } from '../pages/fixtures/homePage.fixture';
import { expect } from '@playwright/test';

test('should display product details to user', async ({ homePage }) => {
  await homePage.goto();
  await homePage.clickOnProductByName('Slip Joint Pliers');

  await expect(homePage.page).toHaveURL(/\/product\//);
  await expect(homePage.productName).toHaveText('Slip Joint Pliers');
  await expect(homePage.getUnitPrice()).toHaveText('9.17');

  await homePage.getAddToCartButton().click();
  await expect(homePage.getSuccessAlert()).toBeVisible();
  await expect(homePage.getSuccessAlert()).toHaveText('Product added to shopping cart.');
  await expect(homePage.getSuccessAlert()).toBeHidden({ timeout: 8000 });

  await expect(homePage.getCartQuantity()).toHaveText('1');
  await homePage.goToCart();

  await expect(homePage.page).toHaveURL(/\/checkout$/);
  await expect(homePage.page.locator('table tbody tr')).toHaveCount(1);
  await expect(homePage.getProductTitleInCart()).toHaveText('Slip Joint Pliers');
  await expect(homePage.getProceedButton()).toBeVisible();
});
