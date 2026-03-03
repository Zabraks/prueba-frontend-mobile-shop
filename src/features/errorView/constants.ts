export type ErrorSection = 'phones' | 'phoneDetail' | 'cart';
export type ErrorAction = 'tryAgain' | 'goBack' | 'continueShopping';

export const ERROR_VIEW_STRINGS = {
  phones: {
    message: 'Could not load the phone catalog. Please try again',
  },
  phoneDetail: {
    message: 'Could not load the phone detail',
  },
  cart: {
    message: 'Could not load your cart',
  },
  action: {
    tryAgain: 'Try again',
    goBack: 'Go back',
    continueShopping: 'Continue shopping',
  },
} as const;
