import { test } from '../pages/fixtures/combined.fixtures';
import { expect } from '@playwright/test';

test('user can complete checkout flow', async ({ homePage, billingPage }) => {
  await homePage.goto();

  await homePage.clickOnProductByName('Combination Pliers');

  await expect(homePage.page).toHaveURL(/\/product/);
  await expect(homePage.productName).toHaveText('Combination Pliers');
  await expect(homePage.getUnitPrice()).toHaveText('14.15');

  await homePage.getAddToCartButton().click();
  await expect(homePage.getSuccessAlert()).toBeVisible();
  await expect(homePage.getCartQuantity()).toHaveText('1');

  await homePage.goToCart();

  await expect(homePage.page).toHaveURL('/checkout');
  await expect(homePage.getCartQuantity()).toHaveText('1');
  await expect(homePage.getProductTitleInCart()).toHaveText('Combination Pliers');
  await expect(homePage.getProceedButton()).toBeVisible();

  await billingPage.proceedToBilling();

  await billingPage.fillBillingDetails({
    street: 'Test St',
    city: 'Orlando',
    state: 'California',
    country: 'United States',
    postalCode: '35467',
  });

  await billingPage.fillPaymentDetails({
    method: 'credit-card',
    cardNumber: '1111-1111-1111-1111',
    CVVInput: '111',
    expirationDate: '08/2025',
    cardHolderName: 'Anna1 Smith1',
  });

  await billingPage.finishPayment();
});