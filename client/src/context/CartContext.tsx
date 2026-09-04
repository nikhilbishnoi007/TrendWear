"use client";

import React, {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

export interface CartItem {
  id: string | number;
  name: string;
  brand?: string;
  price: number;
  quantity: number;
  image?: string;
  size?: string;
  color?: string;
  category?: string;
  description?: string;
  sku?: string;
  metadata?: Record<string, unknown>;
}

export type AddToCartInput = Omit<CartItem, "quantity"> & {
  quantity?: number;
};

export interface CartContextType {
  cart: CartItem[];
  items: CartItem[];
  addToCart: (item: AddToCartInput, quantity?: number) => void;
  removeFromCart: (id: string | number, options?: { size?: string; color?: string }) => void;
  updateQuantity: (id: string | number, quantity: number, options?: { size?: string; color?: string }) => void;
  clearCart: () => void;
  totalItems: number;
  itemCount: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "trendywear_cart";
const EMPTY_CART: CartItem[] = [];

let cachedRaw: string | null = null;
let cachedCart: CartItem[] = EMPTY_CART;

function getCartSnapshot(): CartItem[] {
  if (typeof window === "undefined") {
    return EMPTY_CART;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === cachedRaw) {
      return cachedCart;
    }
    cachedRaw = raw;
    cachedCart = raw ? (JSON.parse(raw) as CartItem[]) : EMPTY_CART;
    if (!Array.isArray(cachedCart)) {
      cachedCart = EMPTY_CART;
    }
    return cachedCart;
  } catch (error) {
    console.error("Failed to read cart from localStorage:", error);
    return cachedCart;
  }
}

function getServerSnapshot(): CartItem[] {
  return EMPTY_CART;
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }
  window.addEventListener("storage", callback);
  window.addEventListener("cart-updated", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("cart-updated", callback);
  };
}

const saveCartToStorage = (newCart: CartItem[]) => {
  try {
    const serialized = JSON.stringify(newCart);
    cachedRaw = serialized;
    cachedCart = newCart;
    localStorage.setItem(STORAGE_KEY, serialized);
    window.dispatchEvent(new Event("cart-updated"));
  } catch (error) {
    console.error("Failed to save cart to localStorage:", error);
  }
};

const isSameItem = (
  item: CartItem,
  id: string | number,
  options?: { size?: string; color?: string }
): boolean => {
  if (item.id !== id) return false;
  if (options?.size !== undefined && item.size !== options.size) return false;
  if (options?.color !== undefined && item.color !== options.color) return false;
  return true;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const cart = useSyncExternalStore(subscribe, getCartSnapshot, getServerSnapshot);

  const addToCart = (item: AddToCartInput, quantity: number = 1) => {
    const qtyToAdd = item.quantity && item.quantity > 0 ? item.quantity : quantity;
    const currentCart = getCartSnapshot();

    const existingIndex = currentCart.findIndex((cartItem) =>
      isSameItem(cartItem, item.id, { size: item.size, color: item.color })
    );

    let updatedCart: CartItem[];
    if (existingIndex > -1) {
      updatedCart = currentCart.map((cartItem, idx) =>
        idx === existingIndex
          ? { ...cartItem, quantity: cartItem.quantity + qtyToAdd }
          : cartItem
      );
    } else {
      const newItem: CartItem = {
        ...item,
        quantity: qtyToAdd,
      };
      updatedCart = [...currentCart, newItem];
    }

    saveCartToStorage(updatedCart);
  };

  const removeFromCart = (
    id: string | number,
    options?: { size?: string; color?: string }
  ) => {
    const currentCart = getCartSnapshot();
    const updatedCart = currentCart.filter((item) => !isSameItem(item, id, options));
    saveCartToStorage(updatedCart);
  };

  const updateQuantity = (
    id: string | number,
    quantity: number,
    options?: { size?: string; color?: string }
  ) => {
    if (quantity <= 0) {
      removeFromCart(id, options);
      return;
    }

    const currentCart = getCartSnapshot();
    const updatedCart = currentCart.map((item) => {
      if (isSameItem(item, id, options)) {
        return { ...item, quantity };
      }
      return item;
    });
    saveCartToStorage(updatedCart);
  };

  const clearCart = () => {
    saveCartToStorage([]);
  };

  const totalItems = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  const totalPrice = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  );

  const value: CartContextType = {
    cart,
    items: cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    itemCount: totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default CartContext;
