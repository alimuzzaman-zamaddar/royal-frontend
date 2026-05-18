/* eslint-disable react-hooks/set-state-in-effect */
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import logo from "../../assets/lineage/6DF99710-9C58-4B44-8A31-20FDC393A953 3.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useResendOtpMutation, useVerifyOtpMutation } from "../../redux/Slices/authApi";
import toast from "react-hot-toast";

type OtpFormValues = {
  otp: string;
};

export const SignupOtp = () => {
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();
const location = useLocation();

const email = location.state?.email as string | undefined;


const [resendOtp, { isLoading: isResendingOtp }] = useResendOtpMutation();

const [verifyOtp] = useVerifyOtpMutation();

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<OtpFormValues>({
    mode: "onBlur",
    defaultValues: {
      otp: "",
    },
  });

  const updateOtpValue = (values: string[]) => {
    setOtpValues(values);
    setValue("otp", values.join(""), {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);

    const newOtpValues = [...otpValues];
    newOtpValues[index] = digit;

    updateOtpValue(newOtpValues);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    const pastedValue = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedValue) return;

    const newOtpValues = ["", "", "", "", "", ""];

    pastedValue.split("").forEach((digit, index) => {
      newOtpValues[index] = digit;
    });

    updateOtpValue(newOtpValues);

    const nextIndex = Math.min(pastedValue.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

const onSubmit = async () => {
  setApiError("");
  setSuccessMessage("");

  const otp = otpValues.join("");

  if (!email) {
    setApiError("Email is missing. Please register again.");
    toast.error("Email is missing. Please register again.");
    return;
  }

  if (otp.length !== 6) {
    setApiError("Please enter the 6-digit OTP.");
    toast.error("Please enter the 6-digit OTP.");
    return;
  }

  try {
    const response = await verifyOtp({
      email,
      otp,
    }).unwrap();

    console.log("Verify OTP response:", response);

    toast.success(response.message || "OTP verified successfully.");
    setSuccessMessage(response.message || "OTP verified successfully.");

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
      "OTP verification failed.";

    setApiError(message);
    toast.error(message);
  }
};

const handleResendOtp = async () => {
  setApiError("");
  setSuccessMessage("");

  if (!email) {
    setApiError("Email is missing. Please register again.");
    toast.error("Email is missing. Please register again.");
    return;
  }

  try {
    const response = await resendOtp({
      email,
    }).unwrap();

    console.log("Resend OTP response:", response);

    toast.success(response.message || "OTP resent successfully.");
    setSuccessMessage(response.message || "OTP resent successfully.");

    setOtpValues(["", "", "", "", "", ""]);
    setValue("otp", "", {
      shouldValidate: true,
      shouldDirty: true,
    });

    inputRefs.current[0]?.focus();
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
      "Failed to resend OTP.";

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
            Email Verification OTP
          </h1>

          <p
            className="mt-3 text-base font-normal leading-[150%] text-[#CDBDCA] sm:text-lg"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Enter the 6-digit OTP we sent to your Email to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <label
            className="mb-4 block text-base font-semibold text-[#FFFAF0]"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Enter OTP
          </label>

          <div className="grid grid-cols-6 gap-2 sm:gap-4">
            {otpValues.map((value, index) => (
              <input
                key={index}
                ref={(element) => {
                  inputRefs.current[index] = element;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={value}
                onChange={(event) => handleOtpChange(index, event.target.value)}
                onKeyDown={(event) => handleKeyDown(index, event)}
                onPaste={handlePaste}
                className="h-[62px] w-full rounded-lg border border-[#B8860B]/30 bg-[#6A0E69] text-center text-2xl font-semibold text-[#FFFAF0] outline-none transition-all duration-300 focus:border-[#FFD700]/50 focus:shadow-[0_0_0_3px_rgba(255,215,0,0.12)] sm:h-[68px]"
                style={{ fontFamily: "'Lora', serif" }}
              />
            ))}
          </div>

          {errors.otp && (
            <p className="mt-2 text-sm text-[#FFD700]">
              {errors.otp.message}
            </p>
          )}

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

          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative mt-8 h-[56px] cursor-pointer w-full overflow-hidden rounded-lg bg-[#FFD700] text-lg font-medium text-[#080500] transition-all duration-300 hover:-translate-y-px hover:bg-[#f5d87a] hover:shadow-[0_10px_30px_rgba(255,215,0,0.25)] disabled:cursor-not-allowed disabled:opacity-70"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <span className="relative z-10">
              {isSubmitting ? "Verifying..." : "OTP Verification"}
            </span>

            <span className="absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-all duration-700 group-hover:left-full" />
          </button>
        </form>

        <p
  className="mt-6 text-center text-base text-[#BFA7C0]"
  style={{ fontFamily: "'Lora', serif" }}
>
  Didn’t receive the OTP?{" "}
  <button
    type="button"
    onClick={handleResendOtp}
    disabled={isResendingOtp}
    className="cursor-pointer font-semibold text-[#FFD700] transition-colors hover:text-[#FFFAF0] disabled:cursor-not-allowed disabled:opacity-60"
  >
    {isResendingOtp ? "Resending..." : "Resend OTP"}
  </button>
</p>
      </div>
    </section>
  );
};