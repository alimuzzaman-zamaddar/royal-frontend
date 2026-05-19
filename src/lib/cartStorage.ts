// src/utils/cartStorage.ts

import toast from "react-hot-toast";

export type CartStorageItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  author?: string;
  badge?: string;
};
export type AddToCartProduct = {
  id: number;
  name: string;
  author?: string;
  image: string;
  price?: number;
  softPrice?: number;
  hardPrice?: number;
  badge?: string;
  rating?: number;
  reviewCount?: number;
  buttonText?: string;

  category?: string;
};

export const CART_STORAGE_KEY = "royal_exchange_cart";
export const CART_UPDATED_EVENT = "royal_exchange_cart_updated";

const notifyCartUpdated = () => {
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
};

export const getCartItems = (): CartStorageItem[] => {
  if (typeof window === "undefined") return [];

  try {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
};

export const saveCartItems = (items: CartStorageItem[]) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  notifyCartUpdated();
};

export const getCartCount = () => {
  const cartItems = getCartItems();

  return cartItems.reduce((total, item) => total + item.quantity, 0);
};

export const getProductPrice = (product: AddToCartProduct) => {
  return product.price ?? product.softPrice ?? product.hardPrice ?? 0;
};

export const addToCart = (product: AddToCartProduct, quantity = 1) => {
  const cartItems = getCartItems();
  const productPrice = getProductPrice(product);

  if (!productPrice) {
    toast.error("Product price is missing.");
    return;
  }

  const existingItem = cartItems.find((item) => item.id === product.id);

  if (existingItem) {
    const updatedCart = cartItems.map((item) =>
      item.id === product.id
        ? {
            ...item,
            quantity: item.quantity + quantity,
          }
        : item,
    );

    saveCartItems(updatedCart);
    toast.success(`${product.name} quantity updated in cart.`);
    return;
  }

  const newCartItem: CartStorageItem = {
    id: product.id,
    name: product.name,
    price: productPrice,
    quantity,
    image: product.image,
    author: product.author,
    badge: product.badge,
  };

  saveCartItems([...cartItems, newCartItem]);
  toast.success(`${product.name} added to cart.`);
};

export const increaseCartItem = (id: number) => {
  const cartItems = getCartItems();

  const updatedCart = cartItems.map((item) =>
    item.id === id
      ? {
          ...item,
          quantity: item.quantity + 1,
        }
      : item,
  );

  saveCartItems(updatedCart);
};

export const decreaseCartItem = (id: number) => {
  const cartItems = getCartItems();

  const updatedCart = cartItems.map((item) =>
    item.id === id
      ? {
          ...item,
          quantity: item.quantity > 1 ? item.quantity - 1 : 1,
        }
      : item,
  );

  saveCartItems(updatedCart);
};

export const removeCartItem = (id: number) => {
  const cartItems = getCartItems();

  const removedItem = cartItems.find((item) => item.id === id);
  const updatedCart = cartItems.filter((item) => item.id !== id);

  saveCartItems(updatedCart);

  if (removedItem) {
    toast.success(`${removedItem.name} removed from cart.`);
  }
};

export const clearCart = () => {
  saveCartItems([]);
  toast.success("Cart cleared successfully.");
};