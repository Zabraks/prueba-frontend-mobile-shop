import { test, expect } from './fixtures';
import { mockPhoneDetail } from '@/mocks/phoneDetail.mock';
import { PHONE_DETAIL_STRINGS } from '@/features/phoneDetail/constants';
import { STORAGE_SELECTOR_STRINGS } from '@/features/phoneDetail/StorageSelector/constants';
import { COLOR_SELECTOR_STRINGS } from '@/features/phoneDetail/ColorSelector/constants';
import { SIMILAR_PRODUCTS_STRINGS } from '@/features/phoneDetail/SimilarProducts/constants';
import { APP_CONFIG } from '@/config/app';
import { ROUTES } from '@/config/routes';

const FIRST_PHONE_URL = /\/phones\/.+/;

test.describe('Phone Detail', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES.phoneDetail(mockPhoneDetail.id));
  });

  test.describe('rendering', () => {
    test('displays the phone name', async ({ page }) => {
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    });

    test('displays the base price', async ({ page }) => {
      const price = page.getByText(`${mockPhoneDetail.basePrice} ${APP_CONFIG.currency}`);
      await expect(price).toBeVisible();
    });

    test('displays the storage selector', async ({ page }) => {
      const storageSelector = page.getByRole('group', { name: STORAGE_SELECTOR_STRINGS.ariaLabel });
      await expect(storageSelector).toBeVisible();
    });

    test('displays the color selector', async ({ page }) => {
      const colorSelector = page.getByRole('group', { name: COLOR_SELECTOR_STRINGS.ariaLabel });
      await expect(colorSelector).toBeVisible();
    });

    test('displays the similar products section', async ({ page }) => {
      const similarProducts = page.getByRole('region', { name: SIMILAR_PRODUCTS_STRINGS.title });
      await expect(similarProducts).toBeVisible();
    });
  });

  test.describe('navigation', () => {
    test('back link navigates to phone list', async ({ page }) => {
      const backLink = page.getByRole('link', { name: PHONE_DETAIL_STRINGS.back });

      await backLink.click();
      await expect(page).toHaveURL(ROUTES.phones);
    });

    test('clicking a similar product navigates to its detail', async ({ page }) => {
      const similarProduct = page.getByRole('list', {
        name: SIMILAR_PRODUCTS_STRINGS.gridAriaLabel,
      });
      await similarProduct.getByRole('listitem').first().click();

      await expect(page).toHaveURL(FIRST_PHONE_URL);
    });
  });

  test.describe('storage selector', () => {
    test('storage options are visible', async ({ page }) => {
      const storageGroup = page.getByRole('group', { name: STORAGE_SELECTOR_STRINGS.ariaLabel });
      const button = storageGroup.getByRole('button').first();

      await expect(button).toBeVisible();
    });

    test('selecting a storage option marks it as selected', async ({ page }) => {
      const storageGroup = page.getByRole('group', { name: STORAGE_SELECTOR_STRINGS.ariaLabel });
      const firstOption = storageGroup.getByRole('button').first();

      await firstOption.click();

      await expect(firstOption).toHaveAttribute('aria-pressed', 'true');
    });

    test('price updates when storage is selected', async ({ page }) => {
      const initialPrice = page.getByText(`${mockPhoneDetail.basePrice} ${APP_CONFIG.currency}`);
      await expect(initialPrice).toBeVisible();

      const storageGroup = page.getByRole('group', { name: STORAGE_SELECTOR_STRINGS.ariaLabel });
      const secondOption = storageGroup.getByRole('button').nth(1);

      await secondOption.click();

      const updatedPrice = page.getByText(`${mockPhoneDetail.basePrice} ${APP_CONFIG.currency}`);
      expect(updatedPrice).not.toBe(initialPrice);
    });
  });

  test.describe('color selector', () => {
    test('color options are visible', async ({ page }) => {
      const colorGroup = page.getByRole('group', { name: COLOR_SELECTOR_STRINGS.ariaLabel });
      const firstColor = colorGroup.getByRole('button').first();

      await expect(firstColor).toBeVisible();
    });

    test('selecting a color marks it as selected', async ({ page }) => {
      const colorGroup = page.getByRole('group', { name: COLOR_SELECTOR_STRINGS.ariaLabel });
      const firstColor = colorGroup.getByRole('button').first();

      await firstColor.click();
      await expect(firstColor).toHaveAttribute('aria-pressed', 'true');
    });

    test('selecting a color updates the product image', async ({ page }) => {
      const image = page.getByRole('img').first();
      const initialSrc = await image.getAttribute('src');

      const colorGroup = page.getByRole('group', { name: COLOR_SELECTOR_STRINGS.ariaLabel });
      const secondColor = colorGroup.getByRole('button').nth(1);

      await secondColor.click();

      const updatedSrc = await image.getAttribute('src');
      expect(updatedSrc).not.toBe(initialSrc);
    });
  });

  test.describe('add to cart button', () => {
    test('is disabled when no storage and color are selected', async ({ page }) => {
      const addToCartButton = page.getByRole('button', {
        name: PHONE_DETAIL_STRINGS.addToCartDisabled,
      });

      await expect(addToCartButton).toBeDisabled();
    });

    test('is disabled when only color is selected', async ({ page }) => {
      const colorGroup = page.getByRole('group', { name: COLOR_SELECTOR_STRINGS.ariaLabel });
      const secondColor = colorGroup.getByRole('button').nth(1);
      await secondColor.click();

      const addToCartButton = page.getByRole('button', {
        name: PHONE_DETAIL_STRINGS.addToCartDisabled,
      });

      await expect(addToCartButton).toBeDisabled();
    });

    test('is enabled when both storage and color are selected', async ({ page }) => {
      const storageGroup = page.getByRole('group', { name: STORAGE_SELECTOR_STRINGS.ariaLabel });
      const stoprageOption = storageGroup.getByRole('button').first();

      await stoprageOption.click();

      const colorGroup = page.getByRole('group', { name: COLOR_SELECTOR_STRINGS.ariaLabel });
      const secondColor = colorGroup.getByRole('button').nth(1);
      await secondColor.click();

      const addToCartButton = page.getByRole('button', {
        name: PHONE_DETAIL_STRINGS.addToCart(mockPhoneDetail.name),
      });

      await expect(addToCartButton).toBeEnabled();
    });
  });
});
