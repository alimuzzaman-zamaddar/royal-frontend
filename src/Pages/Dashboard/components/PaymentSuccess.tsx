import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { clearCart } from "../../../lib/cartStorage";


export const PaymentSuccess = () => {
  useEffect(() => {
    clearCart();
  }, []);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#4A0E4E] px-5 py-16">
      {/* Background Glow */}
      <div className="absolute left-[-120px] top-[-120px] h-[280px] w-[280px] rounded-full bg-[#FFD700]/10 blur-3xl" />
      <div className="absolute bottom-[-140px] right-[-100px] h-[320px] w-[320px] rounded-full bg-[#D4AF37]/10 blur-3xl" />

      {/* Success Card */}
      <div className="relative z-10 w-full max-w-[680px] rounded-[28px] border border-[#D4AF37]/35 bg-[rgba(90,15,88,0.92)] px-6 py-12 shadow-[0_24px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:px-10 sm:py-14">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="flex h-[110px] w-[110px] items-center justify-center rounded-full border border-[#FFD700]/40 bg-[#FFD700]/10 shadow-[0_0_40px_rgba(255,215,0,0.18)]">
            <FaCheckCircle className="text-[60px] text-[#FFD700]" />
          </div>
        </div>

        {/* Title */}
        <h1
          className="mt-8 text-center text-[34px] font-bold leading-[120%] text-[#FFFAF0] sm:text-[42px]"
          style={{ fontFamily: "'Lora', serif" }}
        >
          Payment Successful
        </h1>

        {/* Description */}
        <p
          className="mx-auto mt-5 max-w-[520px] text-center text-[16px] leading-[180%] text-[#E7D9E7] sm:text-lg"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Thank you for your purchase. Your payment has been completed
          successfully and your order is now being processed.
        </p>

        {/* Order Message */}
        <div className="mt-10 rounded-2xl border border-[#D4AF37]/20 bg-[#6A0E69]/50 px-5 py-5">
          <p
            className="text-center text-sm leading-[180%] text-[#FFFAF0]/90 sm:text-base"
            style={{ fontFamily: "'Lora', serif" }}
          >
            A confirmation email and order details will be sent to your
            registered email address shortly.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            to="/profile/orders"
            className="flex h-[56px] items-center justify-center rounded-xl border border-[#FFD700]/40 bg-[#FFD700] px-8 text-base font-bold text-[#080500] transition-all duration-300 hover:-translate-y-px hover:bg-[#f5d87a] hover:shadow-[0_10px_30px_rgba(255,215,0,0.20)]"
            style={{ fontFamily: "'Lora', serif" }}
          >
            View Orders
          </Link>

          <Link
            to="/shop"
            className="flex h-[56px] items-center justify-center rounded-xl border border-[#FFD700]/35 bg-transparent px-8 text-base font-bold text-[#FFFAF0] transition-all duration-300 hover:-translate-y-px hover:border-[#FFD700] hover:bg-[#FFD700] hover:text-[#080500]"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
};