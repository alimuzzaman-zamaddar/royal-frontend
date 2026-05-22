/* eslint-disable no-useless-assignment */
import toast from "react-hot-toast";

export type CopyType = "soft" | "hard";

export type PriceField =
  | "original_price"
  | "discount_price"
  | "soft_copy_price"
  | "soft_copy_discount_price"
  | "hard_copy_price"
  | "hard_copy_discount_price";

export type ProductVariant = {
  id: number;
  title: string;
  stock?: number;
};

export type CartStorageItem = {
  cartKey: string;
  id: number;
  name: string;
  price: number;
  priceField: PriceField;
  quantity: number;
  image: string;
  author?: string;
  badge?: string;
  category?: string;
  originalPrice?: number | null;
  softPrice?: number | null;
  hardPrice?: number | null;
  softPriceField?: PriceField | null;
  hardPriceField?: PriceField | null;
  selectedCopyType?: CopyType | null;
  variantId?: number | null;
  variantTitle?: string | null;
  variants?: ProductVariant[];
};

export type AddToCartProduct = {
  id: number;
  name: string;
  author?: string;
  image: string;
  price?: number;
  priceField?: PriceField;
  originalPrice?: number | null;
  softPrice?: number | null;
  hardPrice?: number | null;
  softPriceField?: PriceField | null;
  hardPriceField?: PriceField | null;
  badge?: string;
  rating?: number;
  reviewCount?: number;
  buttonText?: string;
  category?: string;
  variants?: ProductVariant[];
};

export type AddToCartOptions = {
  quantity?: number;
  selectedCopyType?: CopyType | null;
  selectedVariant?: ProductVariant | null;
};

export const CART_STORAGE_KEY = "royal_exchange_cart";
export const CART_UPDATED_EVENT = "royal_exchange_cart_updated";

const notifyCartUpdated = () => {
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
};

export const getCartItemKey = (
  productId: number,
  selectedCopyType?: CopyType | null,
  variantId?: number | null,
) => `${productId}::${selectedCopyType ?? "none"}::${variantId ?? "none"}`;

const resolveInitialCopyType = (
  product: AddToCartProduct,
  selectedCopyType?: CopyType | null,
): CopyType | null => {
  if (selectedCopyType) return selectedCopyType;

  if (product.softPrice != null) return "soft";
  if (product.hardPrice != null) return "hard";

  return null;
};

const resolvePrice = (
  product: AddToCartProduct,
  selectedCopyType?: CopyType | null,
) => {
  if (selectedCopyType === "soft") {
    return (
      product.softPrice ??
      product.originalPrice ??
      product.price ??
      product.hardPrice ??
      0
    );
  }

  if (selectedCopyType === "hard") {
    return (
      product.hardPrice ??
      product.originalPrice ??
      product.price ??
      product.softPrice ??
      0
    );
  }

  return (
    product.price ??
    product.softPrice ??
    product.hardPrice ??
    product.originalPrice ??
    0
  );
};

const resolvePriceField = (
  product: AddToCartProduct,
  selectedCopyType?: CopyType | null,
) => {
  if (selectedCopyType === "soft") {
    return (
      product.softPriceField ??
      (product.softPrice != null ? "soft_copy_price" : "discount_price")
    );
  }

  if (selectedCopyType === "hard") {
    return (
      product.hardPriceField ??
      (product.hardPrice != null ? "hard_copy_price" : "discount_price")
    );
  }

  return product.priceField ?? "discount_price";
};

const resolvePriceFromItem = (item: CartStorageItem) => {
  if (item.selectedCopyType === "soft") {
    return item.softPrice ?? item.price;
  }

  if (item.selectedCopyType === "hard") {
    return item.hardPrice ?? item.price;
  }

  return item.price;
};

const resolvePriceFieldFromItem = (item: CartStorageItem) => {
  if (item.selectedCopyType === "soft") {
    return (
      item.softPriceField ??
      (item.softPrice != null ? "soft_copy_price" : item.priceField)
    );
  }

  if (item.selectedCopyType === "hard") {
    return (
      item.hardPriceField ??
      (item.hardPrice != null ? "hard_copy_price" : item.priceField)
    );
  }

  return item.priceField;
};

const normalizeCartItems = (items: CartStorageItem[]) => {
  return items.map((item) => {
    if (item.cartKey) return item;

    const cartKey = getCartItemKey(
      item.id,
      item.selectedCopyType ?? null,
      item.variantId ?? null,
    );

    return {
      ...item,
      cartKey,
      priceField: item.priceField ?? "discount_price",
    };
  });
};

export const getCartItems = (): CartStorageItem[] => {
  if (typeof window === "undefined") return [];

  try {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    const parsed = cart ? (JSON.parse(cart) as CartStorageItem[]) : [];
    return normalizeCartItems(parsed);
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

export const addToCart = (
  product: AddToCartProduct,
  quantity = 1,
  options: AddToCartOptions = {},
) => {
  const cartItems = getCartItems();

  const selectedCopyType = resolveInitialCopyType(
    product,
    options.selectedCopyType ?? null,
  );

  const selectedVariant = options.selectedVariant ?? null;
  const productPrice = resolvePrice(product, selectedCopyType);

  if (!productPrice) {
    toast.error("Product price is missing.");
    return;
  }

  const cartKey = getCartItemKey(
    product.id,
    selectedCopyType,
    selectedVariant?.id ?? null,
  );

  const existingItem = cartItems.find((item) => item.cartKey === cartKey);

  if (existingItem) {
    const updatedCart = cartItems.map((item) =>
      item.cartKey === cartKey
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
    cartKey,
    id: product.id,
    name: product.name,
    price: productPrice,
    priceField: resolvePriceField(product, selectedCopyType),
    quantity,
    image: product.image,
    author: product.author,
    badge: product.badge,
    category: product.category,
    originalPrice: product.originalPrice ?? null,
    softPrice: product.softPrice ?? null,
    hardPrice: product.hardPrice ?? null,
    softPriceField: product.softPriceField ?? null,
    hardPriceField: product.hardPriceField ?? null,
    selectedCopyType,
    variantId: selectedVariant?.id ?? null,
    variantTitle: selectedVariant?.title ?? null,
    variants: product.variants ?? [],
  };

  saveCartItems([...cartItems, newCartItem]);
  toast.success(`${product.name} added to cart.`);
};

export const updateCartItemOptions = (
  cartKey: string,
  options: {
    selectedCopyType?: CopyType | null;
    selectedVariant?: ProductVariant | null;
  },
) => {
  const cartItems = getCartItems();
  const currentItem = cartItems.find((item) => item.cartKey === cartKey);

  if (!currentItem) return;

  const nextSelectedCopyType =
    options.selectedCopyType !== undefined
      ? options.selectedCopyType
      : currentItem.selectedCopyType ?? null;

  const nextSelectedVariant =
    options.selectedVariant !== undefined
      ? options.selectedVariant
      : currentItem.variants?.find((variant) => variant.id === currentItem.variantId) ??
        null;

  const updatedItem: CartStorageItem = {
    ...currentItem,
    selectedCopyType: nextSelectedCopyType,
    variantId: nextSelectedVariant?.id ?? null,
    variantTitle: nextSelectedVariant?.title ?? null,
    price: resolvePriceFromItem({
      ...currentItem,
      selectedCopyType: nextSelectedCopyType,
    }),
    priceField: resolvePriceFieldFromItem({
      ...currentItem,
      selectedCopyType: nextSelectedCopyType,
    }),
  };

  const updatedCartKey = getCartItemKey(
    updatedItem.id,
    updatedItem.selectedCopyType,
    updatedItem.variantId,
  );

  updatedItem.cartKey = updatedCartKey;

  const remainingItems = cartItems.filter((item) => item.cartKey !== cartKey);
  const existingSameItem = remainingItems.find(
    (item) => item.cartKey === updatedCartKey,
  );

  let finalCart = remainingItems;

  if (existingSameItem) {
    finalCart = remainingItems.map((item) =>
      item.cartKey === updatedCartKey
        ? {
            ...item,
            quantity: item.quantity + updatedItem.quantity,
          }
        : item,
    );
  } else {
    finalCart = [...remainingItems, updatedItem];
  }

  saveCartItems(finalCart);
};

export const increaseCartItem = (cartKey: string) => {
  const cartItems = getCartItems();

  const updatedCart = cartItems.map((item) =>
    item.cartKey === cartKey
      ? {
          ...item,
          quantity: item.quantity + 1,
        }
      : item,
  );

  saveCartItems(updatedCart);
};

export const decreaseCartItem = (cartKey: string) => {
  const cartItems = getCartItems();

  const updatedCart = cartItems.map((item) =>
    item.cartKey === cartKey
      ? {
          ...item,
          quantity: item.quantity > 1 ? item.quantity - 1 : 1,
        }
      : item,
  );

  saveCartItems(updatedCart);
};

export const removeCartItem = (cartKey: string) => {
  const cartItems = getCartItems();

  const removedItem = cartItems.find((item) => item.cartKey === cartKey);
  const updatedCart = cartItems.filter((item) => item.cartKey !== cartKey);

  saveCartItems(updatedCart);

  if (removedItem) {
    toast.success(`${removedItem.name} removed from cart.`);
  }
};

export const clearCart = () => {
  saveCartItems([]);
  toast.success("Cart cleared successfully.");
};

export const buildCheckoutPayload = () => {
  return getCartItems().map((item) => ({
    product_id: item.id,
    quantity: item.quantity,
    variant_id: item.variantId ?? undefined,
    price_field: item.priceField,
  }));
};