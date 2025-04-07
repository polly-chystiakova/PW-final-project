import { test, expect } from '@playwright/test';


test('should add product to cart', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', {name: 'Slip Joint Pliers'}).click();
  await expect(page).toHaveURL(/\/product/);
  await expect(page.getByTestId('product-name')).toHaveText('Slip Joint Pliers');
  await expect(page.getByTestId('unit-price')).toHaveText('9.17');
  await page.getByTestId('add-to-cart').click();
  await expect(page.getByRole('alert', { name: 'Product added to shopping cart' })).toBeVisible();
  await expect(page.getByTestId('cart-quantity')).toHaveText('1');
  await page.getByTestId('nav-cart').click();
  await expect(page).toHaveURL('/checkout');  
  await expect(page.getByTestId('cart-quantity')).toHaveText('1');  
  await expect(page.getByTestId('product-title')).toHaveText('Slip Joint Pliers');
  await expect(page.getByTestId('proceed-1')).toBeVisible();
});