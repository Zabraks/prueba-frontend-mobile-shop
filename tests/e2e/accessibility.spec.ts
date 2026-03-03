import AxeBuilder from '@axe-core/playwright';
import { expect } from '@playwright/test';
import { test } from '../fixtures';

test.describe('Accessibility', () => {
  test('phone list page should have no accessibility violations', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('phone detail page should have no accessibility violations', async ({ page }) => {
    await page.goto('/phones/SMG-S24U');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('cart page should have no accessibility violations', async ({ page }) => {
    await page.goto('/cart');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
