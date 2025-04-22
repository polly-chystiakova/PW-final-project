import test from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home/home.page';
import { dataCategories } from '../pages/testData/dataCategories';

dataCategories.forEach(({ categoriesToSelect, expectedCategories }) => {
  test(`Verify user can filter products by "${categoriesToSelect.join(' / ')}" categories`, async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();

    for (const category of categoriesToSelect) {
    await homePage.filters.selectCategory(category);
    }

    await homePage.expectFilteredProductsByCategory(expectedCategories);
  });
});