"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  count: number;
  total: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "ifoods-cart";
const EMPTY_CART: CartItem[] = [];

let storedItems: CartItem[] = EMPTY_CART;
let storageLoaded = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function loadFromStorage() {
  if (storageLoaded) return;
  storageLoaded = true;
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    storedItems = raw ? (JSON.parse(raw) as CartItem[]) : EMPTY_CART;
  } catch {
    storedItems = EMPTY_CART;
  }
}

function saveToStorage(next: CartItem[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage may be unavailable; ignore.
  }
}

function getSnapshot() {
  loadFromStorage();
  return storedItems;
}

function getServerSnapshot() {
  return EMPTY_CART;
}

if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (event.key !== STORAGE_KEY) return;
    try {
      storedItems = event.newValue
        ? (JSON.parse(event.newValue) as CartItem[])
        : EMPTY_CART;
    } catch {
      storedItems = EMPTY_CART;
    }
    emit();
  });
}

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    const existing = storedItems.find((entry) => entry.id === item.id);
    const next = existing
      ? storedItems.map((entry) =>
          entry.id === item.id
            ? { ...entry, quantity: entry.quantity + 1 }
            : entry,
        )
      : [...storedItems, { ...item, quantity: 1 }];
    storedItems = next;
    saveToStorage(next);
    emit();
  }, []);

  const removeItem = useCallback((id: string) => {
    const next = storedItems.filter((entry) => entry.id !== id);
    storedItems = next;
    saveToStorage(next);
    emit();
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    const next =
      quantity <= 0
        ? storedItems.filter((entry) => entry.id !== id)
        : storedItems.map((entry) =>
            entry.id === id ? { ...entry, quantity } : entry,
          );
    storedItems = next;
    saveToStorage(next);
    emit();
  }, []);

  const clear = useCallback(() => {
    storedItems = EMPTY_CART;
    saveToStorage(EMPTY_CART);
    emit();
  }, []);

  const value = useMemo(() => {
    const count = items.reduce((sum, entry) => sum + entry.quantity, 0);
    const total = items.reduce(
      (sum, entry) => sum + entry.price * entry.quantity,
      0,
    );
    return { items, addItem, removeItem, updateQuantity, clear, count, total };
  }, [items, addItem, removeItem, updateQuantity, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}