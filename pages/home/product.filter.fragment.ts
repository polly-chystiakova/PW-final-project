import { Locator, Page } from "@playwright/test";
import { CATEGORIES, HAND_TOOLS, OTHER, POWER_TOOLS } from '../../pages/categories-enums';


export type SortOptions = 'Name (A - Z)' | 'Name (Z - A)' | 'Price (Low - High)' | 'Price (High - Low)';

export class FilterFragment {
    readonly page: Page;
    readonly root: Locator;
    readonly sort: Locator;
    readonly categories: Locator;

    constructor(page: Page) {
        this.page = page;
        this.root = page.getByTestId('filters');
        this.sort = page.getByTestId('sort');
        this.categories = this.root.locator('.checkbox');
    }

    async selectSortOption(option: SortOptions): Promise<void> {
        const responsePromise = this.page.waitForResponse((response) =>
          response.url().includes('/products?sort=')
            && response.status() === 200
            && response.request().method() === 'GET',
        );
        await this.sort.selectOption({ label: option });
        await responsePromise;
      }
      async selectCategory(category: HAND_TOOLS | POWER_TOOLS | OTHER | CATEGORIES): Promise<void> {
        const responsePromise = this.page.waitForResponse((response) =>
          response.url().includes('/products?between=price')
          && response.status() === 200
          && response.request().method() === 'GET',
        );
        await this.categories.getByText(category).check();
        await responsePromise;
      }
    }

