"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Burger } from "./data/burgers";
import { Combo } from "./data/combos";

export interface CartCustomization {
  extraPatty: boolean;
  extraCheese: boolean;
  truffleAioli: boolean;
  ghostPepperSauce: boolean;
  caramelizedOnions: boolean;
  goldDust: boolean;
  bunType: "brioche" | "potato" | "milk-bun" | "lettuce-wrap";
  specialNotes?: string;
}

export interface CartItem {
  id: string;
  type: "burger" | "combo" | "side" | "drink";
  title: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  accentColor?: string;
  customization?: CartCustomization;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  vipDiscount: number;
  total: number;
  pointsEarned: number;
  orderComplete: boolean;
  setOrderComplete: (val: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("burgerverse_cart");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // LocalStorage not available or parse error
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("burgerverse_cart", JSON.stringify(items));
    } catch {
      // LocalStorage error
    }
  }, [items]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const addItem = (item: Omit<CartItem, "quantity">, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...item, quantity }];
    });
    setIsOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setItems([]);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const vipDiscount = subtotal > 40 ? subtotal * 0.15 : 0;
  const tax = (subtotal - vipDiscount) * 0.08875;
  const deliveryFee = subtotal > 60 || subtotal === 0 ? 0 : 4.99;
  const total = Math.max(0, subtotal - vipDiscount + tax + deliveryFee);
  const pointsEarned = Math.round(total * 10);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        tax,
        deliveryFee,
        vipDiscount,
        total,
        pointsEarned,
        orderComplete,
        setOrderComplete,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
