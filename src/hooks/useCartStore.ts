import { create } from "zustand";

import type { Cart, CartItem, Product } from "@/interfaces/product";

interface CartStore {
  cart: Cart;
  setCart: (cart: Cart) => void;
  showCart: boolean;
  setShowCart: (showCart: boolean) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

const initialCartState: Cart = {
  items: [],
  total: 0,
  itemCount: 0,
};

// Helper to calculate totals
const calculateCartTotals = (items: CartItem[]): Cart => {
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return { items, total, itemCount };
};

export const useCartStore = create<CartStore>((set) => ({
  cart: initialCartState,
  setCart: (cart) => set({ cart }),
  showCart: false,
  setShowCart: (showCart) => set({ showCart }),
  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cart.items.find(
        (item) => item.product.id === product.id,
      );

      const updatedItems = existingItem
        ? state.cart.items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...state.cart.items, { product, quantity: 1 }];

      return { cart: calculateCartTotals(updatedItems) };
    }),

  removeFromCart: (productId) =>
    set((state) => {
      const updatedItems = state.cart.items
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0);

      return { cart: calculateCartTotals(updatedItems) };
    }),

  clearCart: () => set({ cart: initialCartState }),
}));
