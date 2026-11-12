'use client';

import {createContext, use, useMemo, useReducer, useState, type Dispatch, type ReactNode} from 'react';
import {EMPTY_CART, cartReducer, type CartAction, type CartState} from './lib/cart';

type CartContextValue = {
  cart: CartState;
  dispatch: Dispatch<CartAction>;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({children}: {children: ReactNode}) {
  const [cart, dispatch] = useReducer(cartReducer, EMPTY_CART);
  const [isOpen, setOpen] = useState(false);
  const value = useMemo(() => ({cart, dispatch, isOpen, setOpen}), [cart, isOpen]);
  return <CartContext value={value}>{children}</CartContext>;
}

export function useCart(): CartContextValue {
  const ctx = use(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
