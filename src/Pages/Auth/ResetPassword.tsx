/* eslint-disable react-hooks/set-state-in-effect */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../../assets/lineage/6DF99710-9C58-4B44-8A31-20FDC393A953 3.png";
import { useResetPasswordMutation } from "../../redux/Slices/authApi";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type ResetPasswordFormValues = {
  password: string;
  confirmPassword: string;
};

export const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();
const location = useLocation();

const email = location.state?.email as string | undefined;
const otp = location.state?.otp as string | undefined;

const [resetPasswordApi] = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    mode: "onBlur",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

const onSubmit = async (data: ResetPasswordFormValues) => {
  setApiError("");
  setSuccessMessage("");

  if (!email || !otp) {
    const message = "Email or OTP is missing. Please try forgot password again.";
    setApiError(message);
    toast.error(message);
    return;
  }

  try {
    const response = await resetPasswordApi({
      email,
      otp,
      new_password: data.password,
      new_password_confirmation: data.confirmPassword,
    }).unwrap();

    console.log("Reset password response:", response);

    toast.success(response.message || "Password reset successfully.");
    setSuccessMessage(response.message || "Password reset successfully.");

    reset();

    navigate("/auth/login");
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
      "Password reset failed.";

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
            Create a New Password
          </h1>

          <p
            className="mt-3 text-base font-normal leading-[150%] text-[#CDBDCA] sm:text-lg"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Choose a new strong password to secure your account.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* New Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-3 block text-base font-semibold text-[#FFFAF0]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Enter New Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                autoComplete="new-password"
                {...register("password", {
                  required: "New password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d).+$/,
                    message: "Password must include letters and numbers",
                  },
                })}
                className={`h-[54px] w-full rounded-lg border bg-[#6A0E69] px-4 pr-12 text-base text-[#FFFAF0] outline-none placeholder:text-[#BFA7C0] transition-all duration-300 focus:border-[#FFD700] focus:shadow-[0_0_0_3px_rgba(255,215,0,0.12)] ${
                  errors.password ? "border-[#E0115F]" : "border-[#B8860B]/30"
                }`}
                style={{ fontFamily: "'Lora', serif" }}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#BFA7C0] transition-colors hover:text-[#FFD700]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {errors.password && (
              <p className="mt-2 text-sm text-[#FFD700]">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mt-5">
            <label
              htmlFor="confirmPassword"
              className="mb-3 block text-base font-semibold text-[#FFFAF0]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Confirm New Password
            </label>

            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="********"
                autoComplete="new-password"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className={`h-[54px] w-full rounded-lg border bg-[#6A0E69] px-4 pr-12 text-base text-[#FFFAF0] outline-none placeholder:text-[#BFA7C0] transition-all duration-300 focus:border-[#FFD700] focus:shadow-[0_0_0_3px_rgba(255,215,0,0.12)] ${
                  errors.confirmPassword
                    ? "border-[#E0115F]"
                    : "border-[#B8860B]/30"
                }`}
                style={{ fontFamily: "'Lora', serif" }}
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#BFA7C0] transition-colors hover:text-[#FFD700]"
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-[#FFD700]">
                {errors.confirmPassword.message}
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
            className="group relative cursor-pointer mt-8 h-[56px] w-full overflow-hidden rounded-lg bg-[#FFD700] text-lg font-medium text-[#080500] transition-all duration-300 hover:-translate-y-px hover:bg-[#f5d87a] hover:shadow-[0_10px_30px_rgba(255,215,0,0.25)] disabled:cursor-not-allowed disabled:opacity-70"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <span className="relative z-10">
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </span>

            <span className="absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-all duration-700 group-hover:left-full" />
          </button>
        </form>
      </div>
    </section>
  );
};