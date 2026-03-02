import { ROUTES } from '@/config/routes';
import { test, expect } from './fixtures';
import { SEARCH_BAR_STRINGS } from '@/features/phoneList/SearchBar/constants';
import { API_CONFIG } from '@/config/api';
import { mockPhoneList } from '@/mocks/phonelist.mock';
import { getFilteredPhoneList } from './fixtures/helpers';

test.describe('SearchBar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES.phones);
  });

  test('displays 20 results initially', async ({ page }) => {
    const results = page.getByText(SEARCH_BAR_STRINGS.results(20));

    await expect(results).toBeVisible();
  });

  test('filters phones by search term', async ({ page }) => {
    const searchBox = page.getByRole('searchbox');
    await searchBox.fill('Samsung');
    await expect(page.getByText(/Results/)).toBeVisible();
    await expect(page.getByText(SEARCH_BAR_STRINGS.results(20))).not.toBeVisible();
  });

  test('shows 0 RESULTS when search has no matches', async ({ page }) => {
    const searchBox = page.getByRole('searchbox');
    await searchBox.fill('xyznotexist123');

    const results = page.getByText(SEARCH_BAR_STRINGS.results(0));
    await expect(results).toBeVisible();
  });

  test('clears search when clear button is clicked', async ({ page }) => {
    const searchBox = page.getByRole('searchbox');
    await searchBox.fill('Samsung');

    const clearButton = page.getByRole('button', { name: SEARCH_BAR_STRINGS.clearAriaLabel });
    await clearButton.click();

    await expect(searchBox).toHaveValue('');

    const results = page.getByText(SEARCH_BAR_STRINGS.results(20));
    await expect(results).toBeVisible();
  });

  test('clear button is not visible when input is empty', async ({ page }) => {
    const clearButton = page.getByRole('button', { name: SEARCH_BAR_STRINGS.clearAriaLabel });

    await expect(clearButton).not.toBeVisible();
  });
});

test.describe('Search with URL params', () => {
  test.describe('URL updates', () => {
    test('URL updates after debounce with search term', async ({ page }) => {
      await page.goto(ROUTES.phones);

      const searchBox = page.getByRole('searchbox');
      await searchBox.fill('samsung');

      await expect(page).toHaveURL(`${ROUTES.phones}?search=samsung`);
    });

    test('URL clears search param when input is cleared', async ({ page }) => {
      await page.goto(`${ROUTES.phones}?search=samsung`);

      const clearSearch = page.getByRole('button', { name: 'Clear search' })
      await clearSearch.click();

      await expect(page).toHaveURL(ROUTES.phones);
    });

    test('URL does not update for terms shorter than 3 characters', async ({ page }) => {
      await page.goto(ROUTES.phones);

      const searchBox = page.getByRole('searchbox');
      await searchBox.fill('sa');

      await page.waitForTimeout(API_CONFIG.debounceDelay + 100);
      await expect(page).toHaveURL(ROUTES.phones);
    });
  });

  test.describe('URL params on load', () => {
    test('restores search input from URL on load', async ({ page }) => {
      await page.goto(`${ROUTES.phones}?search=samsung`);

      const searchBox = page.getByRole('searchbox');

      await expect(searchBox).toHaveValue('samsung');
    });

    test('shows filtered results when loading with search param', async ({ page }) => {
      const expectedCount = getFilteredPhoneList('samsung').length;

      await page.goto(`${ROUTES.phones}?search=samsung`);

      const items = page.getByRole('listitem');
      await expect(items).toHaveCount(expectedCount);
      await expect(page.getByText(SEARCH_BAR_STRINGS.results(expectedCount))).toBeVisible();
    });

    test('shows all phones when loading without search param', async ({ page }) => {
      await page.goto(ROUTES.phones);

      const searchBox = page.getByRole('searchbox');
      const resultsTitle = page.getByText(SEARCH_BAR_STRINGS.results(mockPhoneList.length));

      await expect(searchBox).toHaveValue('');
      await expect(resultsTitle).toBeVisible();
    });
  });
});
