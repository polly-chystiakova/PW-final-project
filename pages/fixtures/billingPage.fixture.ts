import { test as base } from '@playwright/test';
import { BillingPage } from '../../pages/billingPage';

export const test = base.extend<{
  billingPage: BillingPage;
}>({
  billingPage: async ({ page }, use) => {
    const billingPage = new BillingPage(page);
    await use(billingPage);
  },
});
