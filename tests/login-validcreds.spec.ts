import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import * as dotenv from 'dotenv';

dotenv.config();

test('should allow user to login with valid creds', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(process.env.TEST_EMAIL!, process.env.TEST_PASSWORD!);

  await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');
  await expect(page.getByTestId('page-title')).toHaveText('My account');
  await expect(page.getByTestId('nav-menu')).toHaveText('Jane Doe');
});