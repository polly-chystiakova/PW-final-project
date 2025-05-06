import { test as base } from '@playwright/test';
import { HeaderFragment } from '../../fragments/header.fragment';

export const test = base.extend<{
  header: HeaderFragment;
}>({
  header: async ({ page }, use) => {
    const header = new HeaderFragment(page);
    await use(header);
  },
});