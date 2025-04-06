import { test, expect } from '@playwright/test';


test('should display product details to user', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-test="product-01JR51TSVF7323XSWJMYXXPW45"]').click();
  expect(page.url()).toContain('https://practicesoftwaretesting.com/product');
  await expect(page.locator('[data-test="product-name"]')).toHaveText('Combination Pliers');
  await expect(page.locator('[data-test="unit-price"]')).toHaveText('14.15');
  await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();
  await expect(page.locator('[data-test="add-to-favorites"]')).toBeVisible();
});