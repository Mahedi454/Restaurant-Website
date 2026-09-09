"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export const DELIVERY_FEE = 3.5;
export const FREE_DELIVERY_THRESHOLD = 40;

export const selectSubtotal = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const selectDeliveryFee = (items: CartItem[]) => {
  if (items.length === 0) return 0;
  return selectSubtotal(items) >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
};

export const selectTotal = (items: CartItem[]) =>
  selectSubtotal(items) + selectDeliveryFee(items);

export const selectCount = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.quantity, 0);

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item, quantity = 1) =>
        set((state) => {
          const safeQuantity = Math.max(1, Math.floor(quantity));
          const existing = state.items.find((entry) => entry.id === item.id);
          const items = existing
            ? state.items.map((entry) =>
                entry.id === item.id
                  ? { ...entry, quantity: entry.quantity + safeQuantity }
                  : entry,
              )
            : [...state.items, { ...item, quantity: safeQuantity }];
          return { items };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((entry) => entry.id !== id),
        })),
      increaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((entry) =>
            entry.id === id ? { ...entry, quantity: entry.quantity + 1 } : entry,
          ),
        })),
      decreaseQuantity: (id) =>
        set((state) => ({
          items: state.items
            .map((entry) =>
              entry.id === id
                ? { ...entry, quantity: entry.quantity - 1 }
                : entry,
            )
            .filter((entry) => entry.quantity > 0),
        })),
      setQuantity: (id, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((entry) => entry.id !== id)
              : state.items.map((entry) =>
                  entry.id === id ? { ...entry, quantity } : entry,
                ),
        })),
      clear: () => set({ items: [] }),
    }),
    {
      name: "ifoods-cart-v2",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

export const useCartItems = () => useCartStore((state) => state.items);

export const useCartCount = () => selectCount(useCartStore((state) => state.items));

export const useCartSubtotal = () =>
  selectSubtotal(useCartStore((state) => state.items));

export const useCartDeliveryFee = () =>
  selectDeliveryFee(useCartStore((state) => state.items));

export const useCartTotal = () =>
  selectTotal(useCartStore((state) => state.items));