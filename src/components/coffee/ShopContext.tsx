'use client';

import {createContext, use, useCallback, useMemo, useReducer, useRef, useState, type Dispatch, type ReactNode} from 'react';
import {cartReducer, type CartAction, type CartLine} from './lib/cart';

type ShopContextValue = {
  cart: CartLine[];
  dispatch: Dispatch<CartAction>;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  /** Coffee shown in the product dialog, or null. */
  productId: string | null;
  openProduct: (id: string) => void;
  closeProduct: () => void;
  /** Remember how to dismiss the latest "added to cart" toast. */
  setToastDismiss: (dismiss: (() => void) | null) => void;
};

const ShopContext = createContext<ShopContextValue | null>(null);

export function ShopProvider({children}: {children: ReactNode}) {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [isCartOpen, setCartOpenState] = useState(false);
  const toastDismiss = useRef<(() => void) | null>(null);
  const setToastDismiss = useCallback((dismiss: (() => void) | null) => {
    toastDismiss.current = dismiss;
  }, []);
  // Opening the cart replaces the toast's message, so dismiss it to keep the
  // drawer the only thing in the top layer.
  const setCartOpen = useCallback((open: boolean) => {
    if (open) {
      toastDismiss.current?.();
      toastDismiss.current = null;
    }
    setCartOpenState(open);
  }, []);
  const [productId, setProductId] = useState<string | null>(null);
  const openProduct = useCallback((id: string) => setProductId(id), []);
  const closeProduct = useCallback(() => setProductId(null), []);
  const value = useMemo(
    () => ({cart, dispatch, isCartOpen, setCartOpen, productId, openProduct, closeProduct, setToastDismiss}),
    [cart, isCartOpen, setCartOpen, productId, openProduct, closeProduct, setToastDismiss],
  );
  return <ShopContext value={value}>{children}</ShopContext>;
}

export function useShop(): ShopContextValue {
  const ctx = use(ShopContext);
  if (!ctx) throw new Error('useShop must be used inside <ShopProvider>');
  return ctx;
}
