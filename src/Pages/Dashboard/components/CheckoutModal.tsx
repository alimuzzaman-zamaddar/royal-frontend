/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import type { CartStorageItem } from "../../../lib/cartStorage";

type CheckoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartStorageItem[];
};

export const CheckoutModal = ({
  isOpen,
  onClose,
  cartItems,
}: CheckoutModalProps) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  // const [isSaved] = useState(true);
  const [promoCode, setPromoCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<
    "paypal" | "stripe" | "cod"
  >("paypal");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((t, i) => t + i.price * i.quantity, 0);

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

  const payload = {
    items: cartItems.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
      price_field: "discount_price",
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
    promo_code: promoCode || undefined,
    payment_method: paymentMethod,
  };

  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/orders/checkout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      },
    );

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-2xl">
      <div className="w-full max-w-[640px] rounded-[20px] border border-[#FFD700]/30 bg-[rgba(75,15,78,0.40)] px-5 py-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xs sm:px-8 md:px-10 lg:px-12">
        <h2
          className="mb-4 text-2xl font-bold text-amber-300"
          style={{ fontFamily: "'Lora', serif" }}
        >
          Checkout
        </h2>

        {error && <p className="mb-3 text-sm text-red-400">{error}</p>}

        <div className="space-y-3">
          <input
            className="h-[54px] w-full rounded-lg border bg-[#6A0E69]/30 px-4 text-base text-[#FFFAF0] outline-none placeholder:text-[#BFA7C0] transition-all duration-300 focus:border-[#FFD700] focus:shadow-[0_0_0_3px_rgba(255,215,0,0.12)] "
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="h-[54px] w-full rounded-lg border bg-[#6A0E69]/30 px-4 text-base text-[#FFFAF0] outline-none placeholder:text-[#BFA7C0] transition-all duration-300 focus:border-[#FFD700] focus:shadow-[0_0_0_3px_rgba(255,215,0,0.12)] "
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="h-[54px] w-full rounded-lg border bg-[#6A0E69]/30 px-4 text-base text-[#FFFAF0] outline-none placeholder:text-[#BFA7C0] transition-all duration-300 focus:border-[#FFD700] focus:shadow-[0_0_0_3px_rgba(255,215,0,0.12)] "
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            className="h-[54px] w-full rounded-lg border bg-[#6A0E69]/30 px-4 text-base text-[#FFFAF0] outline-none placeholder:text-[#BFA7C0] transition-all duration-300 focus:border-[#FFD700] focus:shadow-[0_0_0_3px_rgba(255,215,0,0.12)] "
            placeholder="Street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
          <input
            className="h-[54px] w-full rounded-lg border bg-[#6A0E69]/30 px-4 text-base text-[#FFFAF0] outline-none placeholder:text-[#BFA7C0] transition-all duration-300 focus:border-[#FFD700] focus:shadow-[0_0_0_3px_rgba(255,215,0,0.12)] "
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            className="h-[54px] w-full rounded-lg border bg-[#6A0E69]/30 px-4 text-base text-[#FFFAF0] outline-none placeholder:text-[#BFA7C0] transition-all duration-300 focus:border-[#FFD700] focus:shadow-[0_0_0_3px_rgba(255,215,0,0.12)] "
            placeholder="District"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          />
          <input
            className="h-[54px] w-full rounded-lg border bg-[#6A0E69]/30 px-4 text-base text-[#FFFAF0] outline-none placeholder:text-[#BFA7C0] transition-all duration-300 focus:border-[#FFD700] focus:shadow-[0_0_0_3px_rgba(255,215,0,0.12)] "
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <input
            className="h-[54px] w-full rounded-lg border bg-[#6A0E69]/30 px-4 text-base text-[#FFFAF0] outline-none placeholder:text-[#BFA7C0] transition-all duration-300 focus:border-[#FFD700] focus:shadow-[0_0_0_3px_rgba(255,215,0,0.12)] "
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />

          <input
            className="h-[54px] w-full rounded-lg border bg-[#6A0E69]/30 px-4 text-base text-[#FFFAF0] outline-none placeholder:text-[#BFA7C0] transition-all duration-300 focus:border-[#FFD700] focus:shadow-[0_0_0_3px_rgba(255,215,0,0.12)] "
            placeholder="Promo Code (Optional)"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />

          <select
            className="h-[54px] w-full rounded-lg border bg-[#6A0E69]/30 px-4 text-base text-[#FFFAF0] outline-none placeholder:text-[#BFA7C0] transition-all duration-300 focus:border-[#FFD700] focus:shadow-[0_0_0_3px_rgba(255,215,0,0.12)] "
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value as any)}
          >
            <option value="paypal">PayPal</option>
            <option value="stripe">Stripe</option>
            <option value="cod">Cash on Delivery</option>
          </select>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            className="rounded bg-gray-500 px-4 py-2 hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="rounded bg-[#FFD700] px-6 py-2 font-bold text-[#020202] hover:bg-[#f5d87a]"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Processing..." : `Pay $${subtotal.toFixed(2)}`}
          </button>
        </div>
      </div>
    </div>
  );
};
