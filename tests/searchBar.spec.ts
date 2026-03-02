import { test, expect } from '@playwright/test';
import { SEARCH_BAR_STRINGS } from '@/features/phoneList/SearchBar/constants';

test.describe('SearchBar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/phones');
  });

  test('displays 20 results initially', async ({ page }) => {
    const results = page.getByText(SEARCH_BAR_STRINGS.results(20))

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

    const results = page.getByText(SEARCH_BAR_STRINGS.results(20))
    await expect(results).toBeVisible();
  });

  test('clear button is not visible when input is empty', async ({ page }) => {
    const clearButton = page.getByRole('button', { name: SEARCH_BAR_STRINGS.clearAriaLabel });

    await expect(clearButton).not.toBeVisible();
  });
});