import { test, expect } from '@playwright/test';


test('test', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  await page.locator('[data-test="product-01JR2SQFT1FHCQQD35GS5JAMHC"]').click();
  expect(page.url()).toContain('https://practicesoftwaretesting.com/product');
  await expect(page.locator('[data-test="product-name"]')).toHaveText('Slip Joint Pliers');
  await expect(page.locator('[data-test="unit-price"]')).toHaveText('9.17');
  await page.locator('[data-test="add-to-cart"]').click();
  await expect(page.getByRole('alert', { name: 'Product added to shopping cart' })).toBeVisible();
  await expect(page.locator('[data-test="cart-quantity"]')).toHaveText('1');
  await page.locator('[data-test="nav-cart"]').click();
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/checkout');  
  await expect(page.locator('[data-test="cart-quantity"]')).toHaveText('1');  
  await expect(page.locator('[data-test="product-title"]')).toHaveText('Slip Joint Pliers');
  await expect(page.locator('[data-test="proceed-1"]')).toBeVisible();
});