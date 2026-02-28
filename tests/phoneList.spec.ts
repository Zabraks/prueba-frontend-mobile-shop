import { test, expect } from '@playwright/test';
import { PHONE_LIST_STRINGS } from '@/features/phoneList/PhoneList/constants';

test.describe('Phone List', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/phones');
  });

  test('displays the phone grid', async ({ page }) => {
    await expect(
      page.getByRole('list', { name: PHONE_LIST_STRINGS.gridAriaLabel })
    ).toBeVisible();
  });

  test('displays 20 phones initially', async ({ page }) => {
    await expect(
      page.getByRole('listitem')
    ).toHaveCount(20);
  });

  test('navigates to phone detail on card click', async ({ page }) => {
    await page.getByRole('listitem').first().click();
    await expect(page).toHaveURL(/\/phones\/.+/);
  });
});