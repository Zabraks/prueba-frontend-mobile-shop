import { ROUTES } from '@/config/routes';
import { test, expect } from '../fixtures';
import { PHONE_LIST_STRINGS } from '@/features/phoneList/PhoneList/constants';

test.describe('Phone List', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES.phones);
  });

  test('displays the phone grid', async ({ page }) => {
    const phoneGrid = page.getByRole('list', { name: PHONE_LIST_STRINGS.gridAriaLabel });

    await expect(phoneGrid).toBeVisible();
  });

  test('displays 20 phones initially', async ({ page }) => {
    const phoneItems = page.getByRole('listitem');

    await expect(phoneItems).toHaveCount(20);
  });

  test('navigates to phone detail on card click', async ({ page }) => {
    const firstItem = page.getByRole('listitem').first();
    await expect(firstItem).toBeVisible();

    await Promise.all([page.waitForURL(/\/phones\/.+/), firstItem.click()]);

    await expect(page).toHaveURL(/\/phones\/.+/);
  });
});
