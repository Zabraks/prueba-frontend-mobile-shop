import { test, expect } from './fixtures';
import { NOT_FOUND_STRINGS } from '@/features/notFound/constants';

test.describe('Not Found', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/asd');
  });

  test('shows 404 code', async ({ page }) => {
    const codeText = page.getByText(NOT_FOUND_STRINGS.errorCode);
    await expect(codeText).toBeVisible();
  });

  test('shows not found message', async ({ page }) => {
    const message = page.getByText(NOT_FOUND_STRINGS.message);
    await expect(message).toBeVisible();
  });

  test('shows go to phones button', async ({ page }) => {
    const button = page.getByRole('button', { name: NOT_FOUND_STRINGS.action });

    await expect(button).toBeVisible();
  });

  test('go to phones navigates to /phones', async ({ page }) => {
    const button = page.getByRole('button', { name: NOT_FOUND_STRINGS.action });
    await button.click();
    await expect(page).toHaveURL('/phones');
  });
});