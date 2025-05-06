import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import * as dotenv from 'dotenv';

dotenv.config();

type LoggedInPageFixture = {
  loggedInPage: Page;
};

export const test = base.extend<LoggedInPageFixture>({
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.TEST_EMAIL!, process.env.TEST_PASSWORD!);
    await page.waitForURL('https://practicesoftwaretesting.com/account');
    
    await use(page);
  },
});