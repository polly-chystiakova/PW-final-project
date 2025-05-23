import { expect } from '@playwright/test';
import { test } from '../pages/fixtures/loggedInPage.fixture';

test('user should be logged in', async ({ loggedInPage }) => {
  await test.step('Verify account page and user name', async () => {
    await expect(loggedInPage.getByTestId('page-title')).toHaveText('My account');
    await expect(loggedInPage.getByTestId('nav-menu')).toHaveText('Kurosaki Kurosaki');
  });
});