import { test, expect } from '@playwright/test';

test.describe('SearchBar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/phones');
  });

  test('displays 20 results initially', async ({ page }) => {
    await expect(page.getByText('20 RESULTS')).toBeVisible();
  });

  test('filters phones by search term', async ({ page }) => {
    await page.getByRole('searchbox').fill('Samsung');
    await expect(page.getByText(/RESULTS/)).toBeVisible();
    await expect(page.getByText('20 RESULTS')).not.toBeVisible();
  });

  test('shows 0 RESULTS when search has no matches', async ({ page }) => {
    await page.getByRole('searchbox').fill('xyznotexist123');
    await expect(page.getByText('0 RESULTS')).toBeVisible();
  });

  test('clears search when clear button is clicked', async ({ page }) => {
    await page.getByRole('searchbox').fill('Samsung');
    await page.getByRole('button', { name: 'Clear search' }).click();
    await expect(page.getByRole('searchbox')).toHaveValue('');
    await expect(page.getByText('20 RESULTS')).toBeVisible();
  });

  test('clear button is not visible when input is empty', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Clear search' })
    ).not.toBeVisible();
  });
});