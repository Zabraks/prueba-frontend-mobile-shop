import { test as base, expect } from '@playwright/test';
import { mockPhoneList } from '@/mocks/phonelist.mock';
import { mockPhoneDetail } from '@/mocks/phoneDetail.mock';
import { getFilteredPhoneList } from './helpers';

const API_URL_PATTERN = '**/products**';

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.route(API_URL_PATTERN, async (route) => {
      const url = new URL(route.request().url());
      const pathname = url.pathname;

      if (pathname === '/products' || pathname.endsWith('/products')) {
        const search = url.searchParams.get('search');
        const responseData = search ? getFilteredPhoneList(search) : mockPhoneList;
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(responseData),
        });
        return;
      }

      const productIdMatch = pathname.match(/\/products\/(.+)$/);
      if (productIdMatch) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(mockPhoneDetail),
        });
        return;
      }

      await route.continue();
    });

    await use(page);
  },
});

export { expect };
