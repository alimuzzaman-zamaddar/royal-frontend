/* eslint-disable react-hooks/set-state-in-effect */
import { useState } from "react";
import { useForm } from "react-hook-form";
import logo from "../../assets/lineage/6DF99710-9C58-4B44-8A31-20FDC393A953 3.png";
import { useForgotPasswordMutation } from "../../redux/Slices/authApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type ForgotPasswordFormValues = {
  email: string;
};

export const ForgotPassword = () => {
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
const [forgotPassword] = useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
  });

const onSubmit = async (data: ForgotPasswordFormValues) => {
  setApiError("");
  setSuccessMessage("");

  try {
    const response = await forgotPassword({
      email: data.email,
    }).unwrap();

    console.log("Forgot password response:", response);

    toast.success(response.message || "Password reset instructions sent.");
    setSuccessMessage(response.message || "Password reset instructions sent.");

    navigate("/auth/forgot-otp", {
      state: {
        email: data.email,
      },
    });

    reset();
  } catch (error) {
    const err = error as {
      data?: {
        message?: string;
        errors?: Record<string, string[]>;
      };
    };

    const message =
      err.data?.message ||
      Object.values(err.data?.errors || {})?.[0]?.[0] ||
      "Failed to send password reset instructions.";

    setApiError(message);
    toast.error(message);
  }
};

  return (
    <section className="flex min-h-screen w-full items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-[640px] rounded-[20px] border border-[#FFD700]/30 bg-[rgba(75,15,78,0.40)] px-5 py-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xs sm:px-8 md:px-10 lg:px-12">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <img
            src={logo}
            alt="Royal Exchange Logo"
            className="h-[90px] w-auto object-contain sm:h-[100px]"
          />
        </div>

        {/* Heading */}
        <div className="mb-8 text-center">
          <h1
            className="text-[26px] font-semibold leading-[120%] text-[#FFFAF0] sm:text-[30px]"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Forgot Password?
          </h1>

          <p
            className="mt-3 text-base font-normal leading-[150%] text-[#CDBDCA] sm:text-lg"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Enter your email address and we&apos;ll send you password reset
            instructions.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-3 block text-base font-semibold text-[#FFFAF0]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              placeholder="robertjohnson@example.com"
              autoComplete="email"
              {...register("email", {
                required: "Email address is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email address",
                },
              })}
              className={`h-[54px] w-full rounded-lg border bg-[#6A0E69] px-4 text-base text-[#FFFAF0] outline-none placeholder:text-[#BFA7C0] transition-all duration-300 focus:border-[#FFD700] focus:shadow-[0_0_0_3px_rgba(255,215,0,0.12)] ${
                errors.email ? "border-[#E0115F]" : "border-[#B8860B]/30"
              }`}
              style={{ fontFamily: "'Lora', serif" }}
            />

            {errors.email && (
              <p className="mt-2 text-sm text-[#FFD700]">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* API Messages */}
          {apiError && (
            <p className="mt-4 text-center text-sm text-[#E0115F]">
              {apiError}
            </p>
          )}

          {successMessage && (
            <p className="mt-4 text-center text-sm text-[#FFD700]">
              {successMessage}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative mt-8 h-[56px] cursor-pointer w-full overflow-hidden rounded-lg bg-[#FFD700] text-lg font-medium text-[#080500] transition-all duration-300 hover:-translate-y-px hover:bg-[#f5d87a] hover:shadow-[0_10px_30px_rgba(255,215,0,0.25)] disabled:cursor-not-allowed disabled:opacity-70"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <span className="relative z-10">
              {isSubmitting ? "Sending..." : "Forgot Password"}
            </span>

            <span className="absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-all duration-700 group-hover:left-full" />
          </button>
        </form>
      </div>
    </section>
  );
};