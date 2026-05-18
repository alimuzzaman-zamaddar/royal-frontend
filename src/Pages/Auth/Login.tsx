/* eslint-disable react-hooks/set-state-in-effect */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import logo from "../../assets/lineage/6DF99710-9C58-4B44-8A31-20FDC393A953 3.png";
import { useLoginUserMutation } from "../../redux/Slices/authApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Provider/AuthProvider";
import toast from "react-hot-toast";

type LoginFormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();
const { login } = useAuth();
const [loginUser] = useLoginUserMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

const onSubmit = async (data: LoginFormValues) => {
  setApiError("");
  setSuccessMessage("");

  try {
    const response = await loginUser({
      email: data.email,
      password: data.password,
    }).unwrap();

    console.log("Login response:", response);

    const token =
      response.data?.token ||
      response.data?.access_token ||
      response.token ||
      response.access_token ||
      response.authorization?.token;

    const user =
      response.data?.user ||
      response.user ||
      {};

    if (!token) {
      throw new Error("Login token not found in API response.");
    }

    login(token, user);

    toast.success(response.message || "Logged in successfully.");
    setSuccessMessage(response.message || "Logged in successfully.");

    reset();

    navigate("/dashboard");
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
      "Login failed.";

    setApiError(message);
    toast.error(message);
  }
};

  const handleGoogleLogin = () => {
    /*
      Ready for Google login.
      Example:
      window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
    */

    console.log("Google login clicked");
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
           Welcome Back, Partner
          </h1>

          <p
            className="mt-3 text-base font-normal leading-[150%] text-[#CDBDCA] sm:text-lg"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Glad to see you again. Log in to your account.
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
              Email Address <span className="text-[#E0115F]">*</span>
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
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

          {/* Password */}
          <div className="mt-5">
            <label
              htmlFor="password"
              className="mb-3 block text-base font-semibold text-[#FFFAF0]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Password <span className="text-[#E0115F]">*</span>
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
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

          {/* Remember + Forgot */}
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <label
              className="flex cursor-pointer items-center gap-2 text-sm text-[#CDBDCA]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              <input
                type="checkbox"
                {...register("rememberMe")}
                className="h-4 w-4 cursor-pointer accent-[#FFD700]"
              />
              Remember me
            </label>

            <a
              href="/auth/forgot-password"
              className="text-sm text-[#FFD700] transition-colors hover:text-[#FFFAF0]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Forgot Password?
            </a>
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

          {/* Login Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative mt-8 h-[56px] w-full overflow-hidden rounded-lg bg-[#FFD700] text-lg font-medium text-[#080500] transition-all duration-300 hover:-translate-y-px hover:bg-[#f5d87a] hover:shadow-[0_10px_30px_rgba(255,215,0,0.25)] disabled:cursor-not-allowed disabled:opacity-70"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <span className="relative z-10">
              {isSubmitting ? "Logging in..." : "Login"}
            </span>

            <span className="absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-all duration-700 group-hover:left-full" />
          </button>

          {/* Signup Link */}
          <p
            className="mt-8 text-center text-base text-[#BFA7C0]"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Don&apos;t have an account?{" "}
            <a
              href="/auth/signup"
              className="font-semibold text-[#FFFAF0] transition-colors hover:text-[#FFD700]"
            >
              Signup
            </a>
          </p>

          {/* Divider */}
          <div className="my-8 flex items-center justify-center gap-5">
            <div className="h-px w-full max-w-[150px] bg-[#B8860B]/70" />
            <span
              className="shrink-0 text-base text-[#BFA7C0]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              or connect with
            </span>
            <div className="h-px w-full max-w-[150px] bg-[#B8860B]/70" />
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex h-[52px] w-full cursor-pointer items-center justify-center gap-4 rounded-lg border border-[#FFD700]/30 text-base font-normal text-[#CDBDCA] transition-all duration-300 hover:-translate-y-px hover:bg-[#FFD700] hover:text-[#080500] hover:shadow-[0_8px_24px_rgba(255,215,0,0.20)]"
            style={{ fontFamily: "'Lora', serif" }}
          >
            <FcGoogle className="text-[28px]" />
            Sign in with Google
          </button>
        </form>
      </div>
    </section>
  );
};