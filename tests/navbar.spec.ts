import { test, expect } from '@playwright/test';
import { NAVBAR_STRINGS } from '@/features/layout/Navbar/constants';

test.describe('Navbar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/phones');
  });

  test('is visible', async ({ page }) => {
    const nav = page.getByRole('navigation', { name: NAVBAR_STRINGS.mainNavigationLabel })
    
    await expect(nav).toBeVisible();
  });

  test('the cart icon navigates to /cart', async ({ page }) => {
    const cart = page.getByRole('link', { name: NAVBAR_STRINGS.cartAriaLabel(0) })
    await cart.click();

    await expect(page).toHaveURL('/cart');
  });

  test('the logo navigates to /phones', async ({ page }) => {
    const logo = page.getByRole('link', { name: NAVBAR_STRINGS.logoAriaLabel });
    await logo.click();

    await expect(page).toHaveURL('/phones');
  });

  test('the cart counter displays 0 initially', async ({ page }) => {
    const cart = page.getByRole('link', { name: NAVBAR_STRINGS.cartAriaLabel(0) });

    await expect(cart).toBeVisible();
    await expect(cart.getByText('0')).toBeVisible();
  });
});