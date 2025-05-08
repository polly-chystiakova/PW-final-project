import { test, expect } from '@playwright/test';

test.use({ storageState: 'playwright/.auth/user.json' });

test('mock 20 products', async ({ page }) => {
  const fakeProducts = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Fake Product ${i + 1}`,
    description: `Product description ${i + 1}`,
    price: (i + 1) * 5,
    category: {
      id: '01JTRA0JWSTB7T47508TSPCRGP',
      name: 'Pliers',
      slug: 'pliers',
      parent_id: '01JTRA0JVERFAPAG6MB25H1T2R',
    },
    image: 'https://via.placeholder.com/150',
    featured: false,
    is_location_offer: false,
    is_rental: false,
    in_stock: true,
    product_image: {
      id: '01JTRA0JXFAVRCZYWYZ8PR4EJJ',
      by_name: 'Helinton Fantin',
      by_url: 'https://unsplash.com/@fantin',
      source_name: 'Unsplash',
      source_url: 'https://unsplash.com/photos/W8BNwvOvW4M',
      file_name: 'pliers01.avif',
      title: `Fake Product ${i + 1}`,
    },
    brand: {
      id: '01JTRA0JT3GZW97A20VYT6V4A4',
      name: 'ForgeFlex Tools',
      slug: 'forgeflex-tools',
    },
    'from': 1,
    'last_page': 1,
    'per_page': 20,
    'to': 20,
    'total': 1
  }));

  await page.route('**/products**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: fakeProducts }),
    });
  });

  await page.goto('https://www.practicesoftwaretesting.com/');

  const productCards = page.getByTestId('product-name');
  await expect(productCards).toHaveCount(20);
});