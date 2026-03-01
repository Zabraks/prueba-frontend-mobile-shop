'use client';

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { CartItem } from '@/domain/cart/CartItem';

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
      const stored = localStorage.getItem('cart');
      if (stored) {
        dispatch({ type: 'HYDRATE', payload: JSON.parse(stored) });
      }
    } catch {
      localStorage.removeItem('cart');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (item: CartItem) => dispatch({ type: 'ADD_ITEM', payload: item });

  const removeItem = (phoneId: string) => dispatch({ type: 'REMOVE_ITEM', payload: phoneId });

  const totalItems = state.items.length;

  const totalPrice = state.items.reduce((acc, item) => acc + item.price, 0);

  const isInCart = (phoneId: string) => state.items.some((item) => item.phone.id === phoneId);

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
