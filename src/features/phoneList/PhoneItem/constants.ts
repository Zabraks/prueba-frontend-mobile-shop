export const PHONE_CARD_STRINGS = {
  ariaLabel: (brand: string, name: string) => `View details of ${brand} ${name}`,
  imageAlt: (brand: string, name: string) => `${brand} ${name}`,
  currency: 'Eur',
} as const;
