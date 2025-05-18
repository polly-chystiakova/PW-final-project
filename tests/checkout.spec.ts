import { test } from '../pages/fixtures/combined.fixtures';
import { expect } from '@playwright/test';

test('@regression User can complete checkout flow', async ({ homePage, billingPage }) => {
  await test.step('Go to homepage and add product to cart', async () => {
    await homePage.goto();
    await homePage.clickOnProductByName('Combination Pliers');
    await expect(homePage.page).toHaveURL(/\/product/);
    await expect(homePage.productName).toHaveText('Combination Pliers');
    await expect(homePage.getUnitPrice()).toHaveText('14.15');
    await homePage.getAddToCartButton().click();
    await expect(homePage.getSuccessAlert()).toBeVisible();
    await expect(homePage.getCartQuantity()).toHaveText('1');
  });

  await test.step('Go to cart and verify item', async () => {
    await homePage.goToCart();
    await expect(homePage.page).toHaveURL('/checkout');
    await expect(homePage.getCartQuantity()).toHaveText('1');
    await expect(homePage.getProductTitleInCart()).toHaveText('Combination Pliers');
    await expect(homePage.getProceedButton()).toBeVisible();
  });

  await test.step('Fill billing details', async () => {
    await billingPage.proceedToBilling();
    await billingPage.fillBillingDetails({
      street: 'Test St',
      city: 'Orlando',
      state: 'California',
      country: 'United States',
      postalCode: '35467',
    });
  });

  await test.step('Fill payment details and finish checkout', async () => {
    await billingPage.fillPaymentDetails({
      method: 'credit-card',
      cardNumber: '1111-1111-1111-1111',
      CVVInput: '111',
      expirationDate: '08/2025',
      cardHolderName: 'Anna1 Smith1',
    });
    await billingPage.finishPayment();
  });
});