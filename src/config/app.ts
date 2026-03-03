export const APP_CONFIG = {
  currency: 'eur',
  cartStorageKey: 'cart',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
} as const;
