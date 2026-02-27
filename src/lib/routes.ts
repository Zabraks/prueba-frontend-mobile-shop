export const ROUTES = {
  phones: '/phones',
  phoneDetail: (id: string) => `/phones/${id}`,
  cart: '/cart',
} as const;
