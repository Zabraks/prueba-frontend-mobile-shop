import { test, expect } from '@playwright/test';

test.describe('Navbar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/phones');
  });

  test('is visible', async ({ page }) => {
    await expect(page.getByRole('navigation')).toBeVisible();
  });

  test('the cart icon navigates to /cart', async ({ page }) => {
    await page.getByRole('link', { name: /carrito/i }).click();
    await expect(page).toHaveURL('/cart');
  });

  test('the logo navigates to /phones', async ({ page }) => {
    await page.getByRole('link', { name: 'Ir al inicio' }).click();
    await expect(page).toHaveURL('/phones');
  });

  //TODO: adaptar cuando hagamos el carrito
  test('the cart counter displays 0 initially', async ({ page }) => {
    await expect(page.getByRole('link', { name: /carrito/i })).toBeVisible();
    await expect(page.getByText('0')).toBeVisible();
  });
});