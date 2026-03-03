import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCartContext } from '@/context/CartContext/CartContext';
import { mockCart } from '@/mocks/cart.mock';
import { APP_CONFIG } from '@/config/app';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('initial state', () => {
    it('starts with an empty cart', () => {
      const { result } = renderHook(() => useCartContext(), { wrapper });

      expect(result.current.items).toHaveLength(0);
      expect(result.current.totalItems).toBe(0);
      expect(result.current.totalPrice).toBe(0);
    });

    it('hydrates cart from localStorage on mount', () => {
      localStorage.setItem(APP_CONFIG.cartStorageKey, JSON.stringify(mockCart));
      const { result } = renderHook(() => useCartContext(), { wrapper });

      expect(result.current.items).toHaveLength(mockCart.length);
    });
  });

  describe('addItem', () => {
    it('adds an item to the cart', () => {
      const { result } = renderHook(() => useCartContext(), { wrapper });

      act(() => result.current.addItem(mockCart[0]));

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].name).toBe(mockCart[0].name);
    });

    it('updates totalItems and totalPrice', () => {
      const { result } = renderHook(() => useCartContext(), { wrapper });

      act(() => result.current.addItem(mockCart[0]));

      expect(result.current.totalItems).toBe(1);
      expect(result.current.totalPrice).toBe(mockCart[0].price);
    });
  });

  describe('removeItem', () => {
    it('removes an item from the cart', () => {
      const { result } = renderHook(() => useCartContext(), { wrapper });

      act(() => result.current.addItem(mockCart[0]));
      act(() => result.current.removeItem(mockCart[0].id));

      expect(result.current.items).toHaveLength(0);
    });
  });

  describe('isInCart', () => {
    it('returns false when item is not in cart', () => {
      const { result } = renderHook(() => useCartContext(), { wrapper });

      expect(result.current.isInCart(mockCart[0].id)).toBe(false);
    });

    it('returns true when item is in cart', () => {
      const { result } = renderHook(() => useCartContext(), { wrapper });

      act(() => result.current.addItem(mockCart[0]));

      expect(result.current.isInCart(mockCart[0].id)).toBe(true);
    });
  });

  describe('localStorage persistence', () => {
    it('persists cart to localStorage when items change', () => {
      const { result } = renderHook(() => useCartContext(), { wrapper });

      act(() => result.current.addItem(mockCart[0]));

      const stored = JSON.parse(localStorage.getItem(APP_CONFIG.cartStorageKey) ?? '[]');
      expect(stored).toHaveLength(1);
      expect(stored[0].id).toBe(mockCart[0].id);
    });
  });

  describe('localStorage error handling', () => {
    it('clears localStorage when stored data is invalid JSON', () => {
      localStorage.setItem(APP_CONFIG.cartStorageKey, 'invalid-json{{{');
      const removeItemSpy = vi.spyOn(Storage.prototype, 'removeItem');

      renderHook(() => useCartContext(), { wrapper });

      expect(removeItemSpy).toHaveBeenCalledWith(APP_CONFIG.cartStorageKey);
    });

    it('clears localStorage when parsed data fails validation', () => {
      localStorage.setItem(APP_CONFIG.cartStorageKey, JSON.stringify([{ invalid: 'structure' }]));
      const removeItemSpy = vi.spyOn(Storage.prototype, 'removeItem');

      renderHook(() => useCartContext(), { wrapper });

      expect(removeItemSpy).toHaveBeenCalledWith(APP_CONFIG.cartStorageKey);
    });

    it('starts with empty cart when localStorage has invalid data', () => {
      localStorage.setItem(APP_CONFIG.cartStorageKey, JSON.stringify({ notAnArray: true }));

      const { result } = renderHook(() => useCartContext(), { wrapper });

      expect(result.current.items).toHaveLength(0);
    });
  });
});
