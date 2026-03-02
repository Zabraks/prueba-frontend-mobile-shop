import { CART_STRINGS } from '@/features/cart/constants';
import { CART_ITEM_STRINGS } from '@/features/cart/CartItem/constants';
import { CART_FOOTER_STRINGS } from '@/features/cart/CartFooter/constants';
import { STORAGE_SELECTOR_STRINGS } from '@/features/phoneDetail/StorageSelector/constants';
import { COLOR_SELECTOR_STRINGS } from '@/features/phoneDetail/ColorSelector/constants';
import { PHONE_DETAIL_STRINGS } from '@/features/phoneDetail/constants';
import { NAVBAR_STRINGS } from '@/features/layout/Navbar/constants';
import { test, expect } from './fixtures';
import { ROUTES } from '@/config/routes';

test.describe('Cart', () => {
  test.describe('empty cart', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(ROUTES.cart);
    });

    test('displays CART (0) when empty', async ({ page }) => {
      const title = page.getByText(CART_STRINGS.title(0));

      await expect(title).toBeVisible();
    });

    test('shows continue shopping button', async ({ page }) => {
      const continueShoppingButton = page.getByRole('button', {
        name: CART_FOOTER_STRINGS.continueShopping,
      });

      await expect(continueShoppingButton).toBeVisible();
    });

    test('does not show pay button when empty', async ({ page }) => {
      const payButton = page.getByRole('button', { name: CART_FOOTER_STRINGS.pay });

      await expect(payButton).not.toBeVisible();
    });

    test('continue shopping navigates to /phones', async ({ page }) => {
      const continueShoppingButton = page.getByRole('button', {
        name: CART_FOOTER_STRINGS.continueShopping,
      });

      await continueShoppingButton.click();

      await expect(page).toHaveURL(ROUTES.phones);
    });
  });

  test.describe('cart with items', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(ROUTES.phones);

      const firstPhone = page.getByRole('listitem').first();

      await firstPhone.click();

      const storageOption = page.getByRole('group', { name: STORAGE_SELECTOR_STRINGS.ariaLabel });
      const colorOption = page.getByRole('group', { name: COLOR_SELECTOR_STRINGS.ariaLabel });
      const headerName = await page.getByRole('heading', { level: 1 }).textContent();

      await storageOption.getByRole('button').first().click();
      await colorOption.getByRole('button').first().click();

      const addToCartButton = page.getByRole('button', {
        name: PHONE_DETAIL_STRINGS.addToCart(headerName!),
      });

      await addToCartButton.click();
      await page.goto('/cart');
    });

    test('displays CART (1) after adding an item', async ({ page }) => {
      const title = page.getByText(CART_STRINGS.title(1));

      await expect(title).toBeVisible();
    });

    test('displays the added phone', async ({ page }) => {
      const phoneItem = page.getByRole('article');

      await expect(phoneItem).toBeVisible();
    });

    test('shows total price', async ({ page }) => {
      const total = page.getByText(CART_FOOTER_STRINGS.total);

      await expect(total).toBeVisible();
    });

    test('shows pay button', async ({ page }) => {
      const payButton = page.getByRole('button', { name: CART_FOOTER_STRINGS.pay });

      await expect(payButton).toBeVisible();
    });

    test('removes item when eliminar is clicked', async ({ page }) => {
      const phoneItem = page.getByRole('article');
      const phoneName = await phoneItem.getAttribute('aria-label');
      const removeButton = page.getByRole('button', {
        name: CART_ITEM_STRINGS.removeAriaLabel(phoneName!),
      });

      await removeButton.click();
      await expect(page.getByText(CART_STRINGS.title(0))).toBeVisible();
    });

    test('cart persists after page reload', async ({ page }) => {
      await page.reload();
      const title = page.getByText(CART_STRINGS.title(1));

      await expect(title).toBeVisible();
    });

    test('navbar counter updates after adding item', async ({ page }) => {
      const cartLink = page.getByRole('link', { name: NAVBAR_STRINGS.cartAriaLabel(1) });

      await expect(cartLink).toBeVisible();
    });
  });
});
