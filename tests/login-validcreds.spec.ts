import { expect } from '@playwright/test';
import { test } from '../pages/fixtures/loggedInPage.fixture';
test.use({ storageState: 'playwright/.auth/user.json' });

test('user should be logged in', async ({ loggedInPage }) => {
  await expect(loggedInPage.getByTestId('page-title')).toHaveText('My account');
  await expect(loggedInPage.getByTestId('nav-menu')).toHaveText('Kurosaki Kurosaki');
});