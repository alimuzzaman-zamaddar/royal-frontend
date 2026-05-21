/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useState } from "react";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import {
  CART_UPDATED_EVENT,
  decreaseCartItem,
  getCartItems,
  increaseCartItem,
  removeCartItem,
  type CartStorageItem,
} from "../../../lib/cartStorage";
import { useGetSystemDataQuery } from "../../../redux/Slices/authApi";
import { CheckoutModal } from "./CheckoutModal";

export const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartStorageItem[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const { data: systemData } = useGetSystemDataQuery();
  const minimumOrder = systemData?.data?.minimum_order ?? 100;
  const shippingFee = systemData?.data?.shipping_fee ?? 9.99;

  // Calculate total of all products in cart
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // Determine shipping charge
  const shippingCharge = subtotal < minimumOrder ? shippingFee : 0;

  // Total
  const total = subtotal + shippingCharge;

  const refreshCart = () => {
    setCartItems(getCartItems());
  };

  useEffect(() => {
    refreshCart();

    window.addEventListener(CART_UPDATED_EVENT, refreshCart);
    window.addEventListener("storage", refreshCart);

    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, refreshCart);
      window.removeEventListener("storage", refreshCart);
    };
  }, []);

  const subTotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }, [cartItems]);

  // Dynamic shipping calculation
  const shipping = useMemo(() => {
    if (cartItems.length === 0) return 0;
    return subTotal >= minimumOrder ? 0 : shippingFee;
  }, [cartItems, subTotal, shippingFee, minimumOrder]);

  const handleIncrease = (id: number) => {
    increaseCartItem(id);
    refreshCart();
  };

  const handleDecrease = (id: number) => {
    decreaseCartItem(id);
    refreshCart();
  };

  const handleRemove = (id: number) => {
    removeCartItem(id);
    refreshCart();
  };

  return (
    <main className="min-h-screen w-full bg-[#4A0E4E] px-5 py-14 sm:px-6 md:py-16 xl:px-8 xl:py-40">
      <div className="mx-auto grid max-w-[1480px] grid-cols-1 gap-8 lg:grid-cols-[1fr_430px] xl:gap-8">
        {/* LEFT PRODUCT DETAILS */}
        <section>
          <div className="mb-8 rounded-2xl bg-[linear-gradient(90deg,_#6E5B1D_0%,_#D4AF37_100%)] px-7 py-5 sm:px-9">
            <h1
              className="text-[24px] font-medium leading-[120%] text-[#FFFAF0] sm:text-[28px]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Product Details
            </h1>
          </div>

          <div className="space-y-6">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                  onRemove={handleRemove}
                />
              ))
            ) : (
              <div className="rounded-xl border border-[#D4AF37]/30 px-6 py-14 text-center">
                <p
                  className="text-lg text-[#FFFAF0]"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  Your cart is empty.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* RIGHT ORDER SUMMARY */}
        <aside className="h-fit rounded-[26px] border border-[#D4AF37]/30 px-6 py-7 sm:px-8 lg:sticky lg:top-8">
          <h2
            className="text-center text-[30px] font-bold leading-[120%] text-[#FFFAF0] sm:text-[34px]"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Order Summary
          </h2>

          <div className="mt-14">
            <h3
              className="mb-8 text-lg font-bold text-[#FFFAF0]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Product Details:
            </h3>

            <div className="space-y-7">
              <SummaryRow label="Sub Total" value={`$${subTotal.toFixed(2)}`} />
              <SummaryRow label="Shipping" value={`$${shipping.toFixed(2)}`} />
            </div>

            <div className="my-6 h-px w-full bg-[#FFFAF0]/70" />

            <SummaryRow label="Total" value={`$${total.toFixed(2)}`} large />

            <button
              type="button"
              disabled={cartItems.length === 0}
              onClick={() => setIsCheckoutOpen(true)}
              className="mt-14 h-14 w-full rounded-md bg-[#FFD700] text-base font-bold text-[#080500] transition-all duration-300 hover:-translate-y-px hover:bg-[#f5d87a] hover:shadow-[0_10px_28px_rgba(255,215,0,0.22)] disabled:cursor-not-allowed disabled:opacity-60"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Proceed Checkout
            </button>
          </div>
        </aside>
      </div>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
      />
    </main>
  );
};

const CartItemCard = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: {
  item: CartStorageItem;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
}) => {
  return (
    <article className="flex flex-col gap-5 rounded-xl border border-[#D4AF37]/45 bg-[#650D65] p-4 transition-all duration-300 hover:border-[#FFD700]/70 hover:shadow-[0_14px_34px_rgba(255,215,0,0.10)] sm:flex-row sm:items-center sm:p-5">
      <img
        src={item.image}
        alt={item.name}
        className="h-[130px] w-full rounded-md object-cover sm:h-[120px] sm:w-[135px]"
      />

      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3
            className="text-[24px] font-normal leading-[120%] text-[#FFFAF0] sm:text-[26px]"
            style={{ fontFamily: "'Lora', serif" }}
          >
            {item.name}
          </h3>

          <p
            className="mt-5 text-[22px] font-normal leading-[120%] text-[#FFFAF0] sm:text-[24px]"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Price: ${item.price.toFixed(2)}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-6">
            <p
              className="text-[22px] font-normal leading-[120%] text-[#FFFAF0] sm:text-[24px]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Quantity: {item.quantity}
            </p>

            <div className="flex h-11 items-center gap-3 rounded-lg border border-[#FFFAF0]/30 px-2 text-[#FFFAF0]">
              <button
                type="button"
                onClick={() => onDecrease(item.id)}
                className="flex h-6 w-6 items-center justify-center rounded border border-[#FFFAF0]/30 text-xs transition-colors hover:border-[#FFD700] hover:text-[#FFD700]"
                aria-label="Decrease quantity"
              >
                <FaMinus />
              </button>

              <span
                className="min-w-[18px] text-center text-xl"
                style={{ fontFamily: "'Lora', serif" }}
              >
                {item.quantity}
              </span>

              <button
                type="button"
                onClick={() => onIncrease(item.id)}
                className="flex h-6 w-6 items-center justify-center rounded border border-[#FFFAF0]/30 text-xs transition-colors hover:border-[#FFD700] hover:text-[#FFD700]"
                aria-label="Increase quantity"
              >
                <FaPlus />
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="flex h-9 w-9 shrink-0 items-center justify-center self-end rounded-md bg-[#D4AF37] text-[#FFFAF0] transition-all duration-300 hover:-translate-y-px hover:bg-[#FFD700] hover:text-[#080500] sm:self-center"
          aria-label="Remove item"
        >
          <FaTrashAlt />
        </button>
      </div>
    </article>
  );
};

const SummaryRow = ({
  label,
  value,
  large = false,
}: {
  label: string;
  value: string;
  large?: boolean;
}) => {
  return (
    <div className="flex items-center justify-between gap-6">
      <div
        className={`grid grid-cols-[90px_10px] items-center text-[#FFFAF0] ${
          large ? "text-base" : "text-sm"
        }`}
        style={{ fontFamily: "'Lora', serif" }}
      >
        <span>{label}</span>
        <span>:</span>
      </div>

      <p
        className={`font-bold text-[#FFFAF0] ${
          large ? "text-[26px]" : "text-[24px]"
        }`}
        style={{ fontFamily: "'Lora', serif" }}
      >
        {value}
      </p>
    </div>
  );
};
