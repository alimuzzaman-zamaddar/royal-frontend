/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useState } from "react";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import {
  CART_UPDATED_EVENT,
  decreaseCartItem,
  getCartItems,
  increaseCartItem,
  removeCartItem,
  updateCartItemOptions,
  type CartStorageItem,
  type CopyType,
  type ProductVariant,
} from "../../../lib/cartStorage";
import { useGetSystemDataQuery } from "../../../redux/Slices/authApi";
import { CheckoutModal } from "./CheckoutModal";
import { useApplyPromoMutation } from "../../../redux/Slices/productApi";
import toast from "react-hot-toast";
import { useAuth } from "../../../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";

export const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartStorageItem[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const { data: systemData } = useGetSystemDataQuery();
  const minimumOrder = systemData?.data?.minimum_order ?? 100;
  const shippingFee = systemData?.data?.shipping_fee ?? 9.99;

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromoCode, setAppliedPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const [applyPromo, { isLoading: isApplyingPromo }] = useApplyPromoMutation();

  const subTotal = useMemo(
    () =>
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems],
  );

  const shipping = useMemo(
    () => (subTotal >= minimumOrder ? 0 : shippingFee),
    [subTotal, minimumOrder, shippingFee],
  );

  const total = Math.max(subTotal + shipping - discount, 0);

  const refreshCart = () => setCartItems(getCartItems());

  useEffect(() => {
    refreshCart();
    window.addEventListener(CART_UPDATED_EVENT, refreshCart);
    window.addEventListener("storage", refreshCart);

    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, refreshCart);
      window.removeEventListener("storage", refreshCart);
    };
  }, []);

  const handleIncrease = (cartKey: string) => {
    increaseCartItem(cartKey);
    refreshCart();
  };

  const handleDecrease = (cartKey: string) => {
    decreaseCartItem(cartKey);
    refreshCart();
  };

  const handleRemove = (cartKey: string) => {
    removeCartItem(cartKey);
    refreshCart();
  };

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;

    try {
      const res: any = await applyPromo({
        code: promoCode,
        subtotal: subTotal,
      }).unwrap();

      if (res.success) {
        setDiscount(res.data.discount ?? 0);
        setAppliedPromoCode(res.data?.promo?.code ?? promoCode.trim());
        toast.success(res.message);
      } else {
        setDiscount(0);
        setAppliedPromoCode("");
        toast.error(res.message);
      }
    } catch (err: any) {
      setDiscount(0);
      setAppliedPromoCode("");
      toast.error(err?.data?.message || "Failed to apply promo code");
    }
  };

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <main className="min-h-screen w-full bg-[#4A0E4E] px-5 py-14 sm:px-6 md:py-16 xl:px-8 xl:py-40">
      <div className="mx-auto grid max-w-[1480px] grid-cols-1 gap-8 lg:grid-cols-[1fr_430px] xl:gap-8">
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
                  key={item.cartKey}
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
              {discount > 0 && (
                <SummaryRow label="Discount" value={`$${discount.toFixed(2)}`} />
              )}
            </div>

            <div className="my-6 h-px w-full bg-[#FFFAF0]/70" />

            <SummaryRow
              label="Total"
              value={`$${total.toFixed(2)}`}
              large
            />

            {appliedPromoCode && (
              <p
                className="mt-3 text-sm text-[#FFD700]"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Promo applied: {appliedPromoCode}
              </p>
            )}

            <div className="mt-8 flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter promo code"
                className="flex-1 rounded-md border border-[#FFD700]/30 bg-[#650D65] px-4 py-2 text-[#FFFAF0]"
                style={{ fontFamily: "'Lora', serif" }}
              />
              <button
                type="button"
                onClick={handleApplyPromo}
                className="h-12 cursor-pointer rounded-md bg-[#FFD700] px-6 text-sm font-bold text-[#020202] hover:bg-[#f5d87a]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {isApplyingPromo ? "Applying..." : "Apply"}
              </button>
            </div>

            <button
              type="button"
              disabled={cartItems.length === 0}
              onClick={
                isAuthenticated
                  ? () => setIsCheckoutOpen(true)
                  : () => {
                      navigate("/auth/login");
                      toast.error("Please login to proceed to checkout");
                    }
              }
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
        subtotal={subTotal}
        shipping={shipping}
        discount={discount}
        total={total}
        promoCode={appliedPromoCode}
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
  onIncrease: (cartKey: string) => void;
  onDecrease: (cartKey: string) => void;
  onRemove: (cartKey: string) => void;
}) => {
  const isBook =
    item.category?.toLowerCase() === "books" ||
    item.softPrice != null ||
    item.hardPrice != null;

  const currentCopyType: CopyType | null =
    item.selectedCopyType ??
    (item.softPrice != null
      ? "soft"
      : item.hardPrice != null
        ? "hard"
        : null);

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
                onClick={() => onDecrease(item.cartKey)}
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
                onClick={() => onIncrease(item.cartKey)}
                className="flex h-6 w-6 items-center justify-center rounded border border-[#FFFAF0]/30 text-xs transition-colors hover:border-[#FFD700] hover:text-[#FFD700]"
                aria-label="Increase quantity"
              >
                <FaPlus />
              </button>
            </div>
          </div>

          {isBook && (
            <div className="mt-5">
              <p
                className="mb-2 text-sm text-[#FFFAF0]"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Copy Type
              </p>

              <select
                value={currentCopyType ?? ""}
                onChange={(e) =>
                  updateCartItemOptions(item.cartKey, {
                    selectedCopyType: e.target.value as CopyType,
                  })
                }
                className="h-10 rounded-md border border-[#FFD700]/30 bg-[#650D65] px-3 text-sm text-[#FFFAF0] outline-none"
                style={{ fontFamily: "'Lora', serif" }}
              >
                {item.softPrice != null && <option value="soft">Soft Copy</option>}
                {item.hardPrice != null && <option value="hard">Hard Copy</option>}
              </select>
            </div>
          )}

{item.variants?.length ? (
  <div className="mt-5">
    <p
      className="mb-2 text-sm text-[#FFFAF0]"
      style={{ fontFamily: "'Lora', serif" }}
    >
      Variant
    </p>

    <div className="flex flex-wrap gap-3">
      {item.variants.map((variant: ProductVariant) => {
        const isActive = item.variantId === variant.id;
        const isOutOfStock = variant.stock != null && variant.stock <= 0;

        return (
          <button
            key={variant.id}
            type="button"
            onClick={() => {
              const selectedVariant =
                item.variants?.find((v) => v.id === variant.id) ?? null;

              updateCartItemOptions(item.cartKey, {
                selectedVariant,
              });
            }}
            disabled={isOutOfStock}
            className={`group relative flex flex-col items-start justify-center rounded-[8px] border px-3 py-2 text-left transition-all duration-300 ${
              isActive
                ? "border-[#D4AF37]/30 bg-[#D4AF37] text-[#fffff] shadow-[0_10px_28px_rgba(255,215,0,0.18)]"
                : "border-[#FFD700]/30 bg-[#650D65] text-[#FFFAF0] hover:border-[#650D65]/30 hover:bg-[#420542]"
            } ${isOutOfStock ? "cursor-not-allowed opacity-40" : "cursor-pointer"}`}
          >
            <span
              className={`text-sm font-semibold ${
                isActive ? "text-[#020202]" : "text-[#FFFAF0]"
              }`}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {variant.title}
            </span>

            <span
              className={`mt-1 text-xs ${
                isActive ? "text-[#020202]/80" : "text-[#B8B0A4]"
              }`}
              style={{ fontFamily: "'Lora', serif" }}
            >
              {isOutOfStock ? "Out of stock" : `${variant.stock ?? 0} left`}
            </span>
          </button>
        );
      })}
    </div>
  </div>
) : null}
        </div>

        <button
          type="button"
          onClick={() => onRemove(item.cartKey)}
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