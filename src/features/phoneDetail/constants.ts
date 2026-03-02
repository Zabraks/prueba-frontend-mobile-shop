export const PHONE_DETAIL_STRINGS = {
  back: 'BACK',
  backAriaLabel: 'Back to phone list',
  imageAlt: (name: string) => `${name}`,
  //TODO: Darle a una vuelta a llevarlo como strings genérales de la aplicación
  currency: 'EUR',
  storageLabel: 'STORAGE ¿HOW MUCH SPACE DO YOU NEED?',
  colorLabel: 'COLOR. PICK YOUR FAVOURITE.',
  addToCartButton: 'AÑADIR',
  addToCart: (itemName: string) => `Add ${itemName} to cart`,
  addToCartDisabled: 'Select storage and color to add to cart',
  specsTitle: 'SPECIFICATIONS',
} as const;
