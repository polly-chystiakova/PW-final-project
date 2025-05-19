import { test } from '../pages/fixtures/homePage.fixture';
import { dataSortType } from '../pages/testData/dataSortOptions';

dataSortType.forEach(({ sortBy }) => {
  test(`@regression Verify user can perform sorting products by "${sortBy}"`, async ({ homePage }) => {
  await test.step(`Open homepage and sort by "${sortBy}"`, async () => {
    await homePage.goto();
    await homePage.filters.selectSortOption(sortBy);
  });
  await test.step('Verify products are sorted correctly', async () => {
    await homePage.expectSortedProducts(sortBy);
  });
});
});