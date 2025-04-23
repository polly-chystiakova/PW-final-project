import { Locator, Page, expect } from "@playwright/test";
import { FilterFragment, SortOptions } from "./product.filter.fragment";
import { BasePage } from '../basePage';
import { CATEGORIES, HAND_TOOLS, OTHER, POWER_TOOLS } from '../../pages/categories-enums';

export class HomePage extends BasePage {
    public readonly pagePath: string = '/';
  
    readonly productName: Locator = this.page.getByTestId('product-name');
    readonly productPrice: Locator = this.page.getByTestId('product-price');
    readonly filters: FilterFragment = new FilterFragment(this.page);
      
    async goto(): Promise<void> {
    await this.page.goto(this.pagePath);
     }
     getProductByName(name: string): Locator {
      return this.productName.filter({ hasText: name });
    }
    
    async clickOnProductByName(name: string): Promise<void> {
      await this.getProductByName(name).click();
    }
    
    getUnitPrice(): Locator {
      return this.page.getByTestId('unit-price');
    }
    
    getAddToCartButton(): Locator {
      return this.page.getByTestId('add-to-cart');
    }
    
    getCartQuantity(): Locator {
      return this.page.getByTestId('cart-quantity');
    }
    
    getSuccessAlert(): Locator {
      return this.page.getByRole('alert');
    }
    
    async goToCart(): Promise<void> {
      await this.page.getByTestId('nav-cart').click();
    }
    
    getProductTitleInCart(): Locator {
      return this.page.getByTestId('product-title');
    }
    
    getProceedButton(): Locator {
      return this.page.getByTestId('proceed-1');
    }
    
    async getProductNames(): Promise<string[]> {
      const productNames = await this.productName.allTextContents();
      return productNames;
    }
    
    async getProductPrices(): Promise<number[]> {
      const productPrices = await this.productPrice.allTextContents();
      return productPrices.map((price) => parseInt(price.replace('$', '').trim()));
    }
     
    async expectSortedProducts(sortBy: SortOptions): Promise<void> {
      switch (sortBy) {
        case 'Name (A - Z)': {
          const productNames = await this.getProductNames();
          const sortedProductsNamesAZ = productNames.slice().sort((a, b) => a.localeCompare(b));
          const areProductsNamesSorted = productNames.join() === sortedProductsNamesAZ.join();
  
        expect(
              areProductsNamesSorted,
              `Products are sorted incorrectly from A to Z.
                Actual products names - ${productNames}, expected products names - ${sortedProductsNamesAZ}`,
          ).toBe(true);
          break;
        }
        case 'Name (Z - A)': {
          const productNames = await this.getProductNames();
          const sortedProductsNamesZA = productNames.slice().sort((a, b) => b.localeCompare(a));
          const areProductsNamesSorted = productNames.join() === sortedProductsNamesZA.join();
  
        
          expect(
              areProductsNamesSorted,
              `Products are sorted incorrectly from Z to A.
                Actual products names - ${productNames}, expected products names - ${sortedProductsNamesZA}`,
          ).toBe(true);
          break;
        }
        case 'Price (Low - High)': {
          const productPrices = await this.getProductPrices();
          const sortedProductsPricesLowHigh = productPrices.slice().sort((a, b) => a - b);
          const areProductsPricesSorted = productPrices.join() === sortedProductsPricesLowHigh.join();
  
          expect(
              areProductsPricesSorted,
              `Products are sorted incorrectly from Low to High.
                Actual products prices - ${productPrices}, expected products prices - ${sortedProductsPricesLowHigh}`,
          ).toBe(true);
          break;
        }
        case 'Price (High - Low)': {
          const productPrices = await this.getProductPrices();
          const sortedProductsPricesHighLow = productPrices.slice().sort((a, b) => b - a);
          const areProductsPricesSorted = productPrices.join() === sortedProductsPricesHighLow.join();
  
          
          expect(
              areProductsPricesSorted,
              `Products are sorted incorrectly from High to Low.
                Actual products prices - ${productPrices}, expected products prices - ${sortedProductsPricesHighLow}`,
          ).toBe(true);
          break;
        }
        default:
          throw new Error(`Unknown sort option: ${sortBy}`);
      }
    }
  
    async expectFilteredProductsByCategory(categories: (HAND_TOOLS | POWER_TOOLS | OTHER)[]): Promise<void> {
      const productNames = await this.getProductNames();
  
      const unexpectedProducts = productNames.filter((productName) => {
        return !categories.some((category) => productName.includes(category));
      });
  
      expect(
          unexpectedProducts.length,
          `Unexpected products found for categories: ${categories.join(', ')}.
              Unexpected: ${unexpectedProducts.join(', ')}.\nAll: ${productNames.join(', ')}`,
      ).toBe(0);
    }
  }