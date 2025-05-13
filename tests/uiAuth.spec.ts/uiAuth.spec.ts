import { expect} from '@playwright/test';
import { test } from '../../pages/fixtures/loggedInPage.fixture';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test('user should be logged in', async ({ loggedInPage }) => {
await test.step('Check that user is on the account page', async () => {
  await expect(loggedInPage.getByTestId('page-title')).toHaveText('My account');
  await expect(loggedInPage.getByTestId('nav-menu')).toHaveText('Kurosaki Kurosaki');
});

await test.step('Save authentication storage state to file', async () => {
  await loggedInPage.context().storageState({ path: authFile });
});
});