import { test as base } from '../../pages/fixtures/loggedInPage.fixture';
import type { Page } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { HomePage } from '../../pages/home/home.page';
import { BillingPage } from '../../pages/billingPage';
import * as dotenv from 'dotenv';

dotenv.config();

type Fixtures = {
  loggedInPage: Page;
  homePage: HomePage;
  billingPage: BillingPage;
};

export const test = base.extend<Fixtures>({
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.TEST_EMAIL!, process.env.TEST_PASSWORD!);
    await page.waitForURL(/\/account$/);
    await use(page);
  },

  homePage: async ({ loggedInPage }, use) => {
    const home = new HomePage(loggedInPage);
    await use(home);
  },

  billingPage: async ({ loggedInPage }, use) => {
    const billing = new BillingPage(loggedInPage);
    await use(billing);
  },
});