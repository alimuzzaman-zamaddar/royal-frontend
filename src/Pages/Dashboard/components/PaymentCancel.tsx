import { FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export const PaymentCancel = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#4A0E4E] px-5 py-16">
      {/* Background Glow */}
      <div className="absolute left-[-120px] top-[-120px] h-[280px] w-[280px] rounded-full bg-red-500/10 blur-3xl" />
      <div className="absolute bottom-[-140px] right-[-100px] h-[320px] w-[320px] rounded-full bg-[#D4AF37]/10 blur-3xl" />

      {/* Cancel Card */}
      <div className="relative z-10 w-full max-w-[680px] rounded-[28px] border border-[#D4AF37]/35 bg-[rgba(90,15,88,0.92)] px-6 py-12 shadow-[0_24px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:px-10 sm:py-14">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="flex h-[110px] w-[110px] items-center justify-center rounded-full border border-red-400/40 bg-red-500/10 shadow-[0_0_40px_rgba(239,68,68,0.18)]">
            <FaTimesCircle className="text-[60px] text-red-400" />
          </div>
        </div>

        {/* Title */}
        <h1
          className="mt-8 text-center text-[34px] font-bold leading-[120%] text-[#FFFAF0] sm:text-[42px]"
          style={{ fontFamily: "'Lora', serif" }}
        >
          Payment Cancelled
        </h1>

        {/* Description */}
        <p
          className="mx-auto mt-5 max-w-[520px] text-center text-[16px] leading-[180%] text-[#E7D9E7] sm:text-lg"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Your payment was cancelled and no charges were made. You can return
          to your cart and complete the checkout whenever you are ready.
        </p>

        {/* Message Box */}
        <div className="mt-10 rounded-2xl border border-red-400/20 bg-[#6A0E69]/50 px-5 py-5">
          <p
            className="text-center text-sm leading-[180%] text-[#FFFAF0]/90 sm:text-base"
            style={{ fontFamily: "'Lora', serif" }}
          >
            If this happened by mistake or you experienced any issue during
            checkout, please try again or contact support for assistance.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            to="/cart"
            className="flex h-[56px] items-center justify-center rounded-xl border border-[#FFD700]/40 bg-[#FFD700] px-8 text-base font-bold text-[#080500] transition-all duration-300 hover:-translate-y-px hover:bg-[#f5d87a] hover:shadow-[0_10px_30px_rgba(255,215,0,0.20)]"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Return to Cart
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