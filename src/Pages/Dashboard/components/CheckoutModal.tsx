/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import type { CartStorageItem } from "../../../lib/cartStorage";

type CheckoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartStorageItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  promoCode?: string;
};

export const CheckoutModal = ({
  isOpen,
  onClose,
  cartItems,
  subtotal,
  shipping,
  discount,
  total,
  promoCode,
}: CheckoutModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<
    "paypal" | "stripe" | "cod"
  >("paypal");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (
      !name ||
      !email ||
      !phone ||
      !street ||
      !city ||
      !district ||
      !country ||
      !postalCode
    ) {
      setError("Please fill all required fields.");
      return;
    }

    setError("");
    setLoading(true);

    const token = localStorage.getItem("token");

    const payload: any = {
      items: cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        ...(item.variantId ? { variant_id: item.variantId } : {}),
        price_field:
          item.priceField ||
          (item.selectedCopyType === "soft"
            ? item.softPriceField || "soft_copy_price"
            : item.selectedCopyType === "hard"
              ? item.hardPriceField || "hard_copy_price"
              : "discount_price"),
      })),
      billing_address: {
        name,
        email,
        phone,
        street,
        city,
        country,
        district,
        postal_code: postalCode,
        is_saved: true,
      },
      payment_method: paymentMethod,
    };

    if (promoCode) {
      payload.promo_code = promoCode;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/orders/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        window.location.href = data.data.checkout_url;
      } else {
        setError(data.message || "Checkout failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 px-3 py-4 backdrop-blur-2xl sm:items-center sm:px-4 sm:py-6">
      <div className="max-h-[92vh] w-full max-w-[94vw] overflow-y-auto rounded-[16px] border border-[#FFD700]/30 bg-[rgba(75,15,78,0.40)] px-4 py-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xs sm:max-w-[560px] sm:rounded-[18px] sm:px-5 sm:py-6 md:max-w-[600px] md:px-7 md:py-7 lg:max-w-[640px] lg:rounded-[20px] lg:px-8 lg:py-8">
        <h2
          className="mb-3 text-xl font-bold text-amber-300 sm:mb-4 sm:text-2xl"
          style={{ fontFamily: "'Lora', serif" }}
        >
          Checkout
        </h2>

        {error && <p className="mb-3 text-xs text-red-400 sm:text-sm">{error}</p>}

        <div className="mb-4 rounded-lg border border-[#FFD700]/20 bg-[#050505]/40 p-4 text-sm text-[#FFFAF0]">
          <div className="flex items-center justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="mt-2 flex items-center justify-between">
              <span>Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
          {promoCode && (
            <div className="mt-2 flex items-center justify-between">
              <span>Promo Code</span>
              <span>{promoCode}</span>
            </div>
          )}
          <div className="mt-3 h-px w-full bg-[#FFD700]/20" />
          <div className="mt-3 flex items-center justify-between text-base font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
          <input
            className="h-[40px] w-full rounded-lg border border-[#FFD700]/30 bg-[#6A0E69]/30 px-3 text-sm text-[#FFFAF0] outline-none placeholder:text-[#BFA7C0] transition-all duration-300 focus:border-[#FFD700] focus:shadow-[0_0_0_3px_rgba(255,215,0,0.12)] sm:h-[44px] sm:px-4 md:h-[46px]"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="h-[40px] w-full rounded-lg border border-[#FFD700]/30 bg-[#6A0E69]/30 px-3 text-sm text-[#FFFAF0] outline-none placeholder:text-[#BFA7C0] transition-all duration-300 focus:border-[#FFD700] focus:shadow-[0_0_0_3px_rgba(255,215,0,0.12)] sm:h-[44px] sm:px-4 md:h-[46px]"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="h-[40px] w-full rounded-lg border border-[#FFD700]/30 bg-[#6A0E69]/30 px-3 text-sm text-[#FFFAF0] outline-none placeholder:text-[#BFA7C0] transition-all duration-300 focus:border-[#FFD700] focus:shadow-[0_0_0_3px_rgba(255,215,0,0.12)] sm:h-[44px] sm:px-4 md:h-[46px]"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            className="h-[40px] w-full rounded-lg border border-[#FFD700]/30 bg-[#6A0E69]/30 px-3 text-sm text-[#FFFAF0] outline-none placeholder:text-[#BFA7C0] transition-all duration-300 focus:border-[#FFD700] focus:shadow-[0_0_0_3px_rgba(255,215,0,0.12)] sm:h-[44px] sm:px-4 md:h-[46px]"
            placeholder="Street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
          <input
            className="h-[40px] w-full rounded-lg border border-[#FFD700]/30 bg-[#6A0E69]/30 px-3 text-sm text-[#FFFAF0] outline-none placeholder:text-[#BFA7C0] transition-all duration-300 focus:border-[#FFD700] focus:shadow-[0_0_0_3px_rgba(255,215,0,0.12)] sm:h-[44px] sm:px-4 md:h-[46px]"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            className="h-[40px] w-full rounded-lg border border-[#FFD700]/30 bg-[#6A0E69]/30 px-3 text-sm text-[#FFFAF0] outline-none placeholder:text-[#BFA7C0] transition-all duration-300 focus:border-[#FFD700] focus:shadow-[0_0_0_3px_rgba(255,215,0,0.12)] sm:h-[44px] sm:px-4 md:h-[46px]"
            placeholder="District"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          />
          <input
            className="h-[40px] w-full rounded-lg border border-[#FFD700]/30 bg-[#6A0E69]/30 px-3 text-sm text-[#FFFAF0] outline-none placeholder:text-[#BFA7C0] transition-all duration-300 focus:border-[#FFD700] focus:shadow-[0_0_0_3px_rgba(255,215,0,0.12)] sm:h-[44px] sm:px-4 md:h-[46px]"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <input
            className="h-[40px] w-full rounded-lg border border-[#FFD700]/30 bg-[#6A0E69]/30 px-3 text-sm text-[#FFFAF0] outline-none placeholder:text-[#BFA7C0] transition-all duration-300 focus:border-[#FFD700] focus:shadow-[0_0_0_3px_rgba(255,215,0,0.12)] sm:h-[44px] sm:px-4 md:h-[46px]"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />

          <div className="relative sm:col-span-2">
            <select
              className="h-[40px] w-full cursor-pointer appearance-none rounded-lg border border-[#FFD700]/30 bg-[#6A0E69]/30 px-3 pr-10 text-sm text-[#FFFAF0] outline-none transition-all duration-300 focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 sm:h-[44px] sm:px-4 sm:pr-10 md:h-[46px]"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as any)}
            >
              <option className="bg-[#4B0F4E] text-[#FFFAF0]" value="paypal">
                PayPal
              </option>
              <option className="bg-[#4B0F4E] text-[#FFFAF0]" value="stripe">
                Stripe
              </option>
              <option className="bg-[#4B0F4E] text-[#FFFAF0]" value="cod">
                COD
              </option>
            </select>

            <span className="pointer-events-none absolute right-3 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center text-[#FFD700]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        </div>

        <div className="mt-5 flex flex-col-reverse gap-2 sm:mt-6 sm:flex-row sm:justify-between">
          <button
            className="rounded bg-gray-500 px-4 py-2 text-sm hover:bg-gray-600 sm:text-base"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="rounded bg-[#FFD700] px-5 py-2 text-sm font-bold text-[#020202] hover:bg-[#f5d87a] sm:px-6 sm:text-base"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Processing..." : `Pay $${total.toFixed(2)}`}
          </button>
        </div>
      </div>
    </div>
  );
};