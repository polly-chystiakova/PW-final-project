import { test } from '../pages/fixtures/homePage.fixture';
import { dataSortType } from '../pages/testData/dataSortOptions';

dataSortType.forEach(({ sortBy }) => {
  test(`Verify user can perform sorting products by "${sortBy}"`, async ({ homePage }) => {
    await homePage.goto();
    await homePage.filters.selectSortOption(sortBy);
    await homePage.expectSortedProducts(sortBy);
  });
});