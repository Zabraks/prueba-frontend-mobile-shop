export const PHONE_DETAIL_STRINGS = {
  back: 'Back',
  backAriaLabel: 'Back to phone list',
  imageAlt: (name: string) => `${name}`,
  //TODO: Darle a una vuelta a llevarlo como strings genérales de la aplicación
  currency: 'Eur',
  storageLabel: 'Storage ¿How much space do you need?',
  colorLabel: 'Color. Pick your favorite.',
  addToCartButton: 'Añadir',
  addToCart: (itemName: string) => `Add ${itemName} to cart`,
  addToCartDisabled: 'Select storage and color to add to cart',
  specsTitle: 'Specifications',
} as const;
