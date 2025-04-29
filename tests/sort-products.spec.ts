import test from '@playwright/test';
import { HomePage } from '../pages/home/home.page';
import { dataSortType } from '../pages/testData/dataSortOptions';

dataSortType.forEach(({ sortBy }) => {
  test(`Verify user can perform sorting products by "${sortBy}"`, async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.filters.selectSortOption(sortBy);
    await homePage.expectSortedProducts(sortBy);
  });
});