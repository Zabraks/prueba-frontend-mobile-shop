'use client';

import { APP_CONFIG } from '@/config/app';
import { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { CartItem } from '@/domain/cart/cart.types';

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'HYDRATE'; payload: CartItem[] };

interface CartContextValue {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (phoneId: string) => void;
  totalItems: number;
  totalPrice: number;
  isInCart: (phoneId: string) => boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

const isCartItemArray = (data: unknown): data is CartItem[] => {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        typeof item.id === 'string' &&
        typeof item.name === 'string' &&
        typeof item.price === 'number' &&
        typeof item.img === 'string'
    )
  );
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'HYDRATE':
      return { items: action.payload };
    case 'ADD_ITEM':
      return { items: [...state.items, action.payload] };
    case 'REMOVE_ITEM':
      return {
        items: state.items.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(APP_CONFIG.cartStorageKey);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (isCartItemArray(parsed)) {
          dispatch({ type: 'HYDRATE', payload: parsed });
        } else {
          localStorage.removeItem(APP_CONFIG.cartStorageKey);
        }
      }
    } catch {
      localStorage.removeItem(APP_CONFIG.cartStorageKey);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(APP_CONFIG.cartStorageKey, JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (item: CartItem) => dispatch({ type: 'ADD_ITEM', payload: item });

  const removeItem = (phoneId: string) => dispatch({ type: 'REMOVE_ITEM', payload: phoneId });

  const totalItems = state.items.length;

  const totalPrice = Number(state.items.reduce((acc, item) => acc + item.price, 0).toFixed(2));

  const isInCart = (phoneId: string) => state.items.some((item) => item.id === phoneId);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        totalItems,
        totalPrice,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = (): CartContextValue => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCartContext must be used within CartProvider');
  return context;
};
