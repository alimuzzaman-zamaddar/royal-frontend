import { useState } from "react";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import toast from "react-hot-toast";
import { useChangePasswordMutation } from "../../../redux/Slices/authApi";

type SettingsFormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export const SettingsTab = () => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SettingsFormValues>({
    mode: "onBlur",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword");

  const handleShowUpdateForm = () => {
    setShowUpdateForm(true);
  };

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      const response = await changePassword({
        current_password: data.currentPassword,
        new_password: data.newPassword,
        new_password_confirmation: data.confirmPassword,
      }).unwrap();

      console.log("Change password response:", response);

      toast.success(response.message || "Password updated successfully.");
      reset();
      setShowUpdateForm(false);
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
        "Password update failed.";

      toast.error(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
      <div className="space-y-8">
        {/* Existing Password */}
        <PasswordInputBox
          label="Password"
          id="currentPassword"
          placeholder="********"
          type={showCurrentPassword ? "text" : "password"}
          error={errors.currentPassword?.message}
          register={register("currentPassword", {
            required: "Current password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          onToggle={() => setShowCurrentPassword((prev) => !prev)}
          isVisible={showCurrentPassword}
        />

        {/* Final Update Password Fields */}
        {showUpdateForm && (
          <>
            <PasswordInputBox
              label="New Password"
              id="newPassword"
              placeholder="********"
              type={showNewPassword ? "text" : "password"}
              error={errors.newPassword?.message}
              register={register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "New password must be at least 6 characters",
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d).+$/,
                  message: "Password must include letters and numbers",
                },
              })}
              onToggle={() => setShowNewPassword((prev) => !prev)}
              isVisible={showNewPassword}
            />

            <PasswordInputBox
              label="Confirm Password"
              id="confirmPassword"
              placeholder="********"
              type={showConfirmPassword ? "text" : "password"}
              error={errors.confirmPassword?.message}
              register={register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              })}
              onToggle={() => setShowConfirmPassword((prev) => !prev)}
              isVisible={showConfirmPassword}
            />
          </>
        )}
      </div>

      {!showUpdateForm ? (
        <button
          type="button"
          onClick={handleShowUpdateForm}
          className="mt-10 h-12 w-full cursor-pointer rounded-md bg-[#FFD700] text-base font-normal text-[#080500] transition-all duration-300 hover:-translate-y-px hover:bg-[#f5d87a] hover:shadow-[0_8px_24px_rgba(255,215,0,0.22)]"
          style={{ fontFamily: "'Lora', serif" }}
        >
          Update Password
        </button>
      ) : (
        <button
          type="submit"
          disabled={isSubmitting || isChangingPassword}
          className="mt-10 h-12 w-full cursor-pointer rounded-md bg-[#FFD700] text-base font-normal text-[#080500] transition-all duration-300 hover:-translate-y-px hover:bg-[#f5d87a] hover:shadow-[0_8px_24px_rgba(255,215,0,0.22)] disabled:cursor-not-allowed disabled:opacity-70"
          style={{ fontFamily: "'Lora', serif" }}
        >
          {isSubmitting || isChangingPassword
            ? "Updating..."
            : "Update Password"}
        </button>
      )}
    </form>
  );
};

const PasswordInputBox = ({
  label,
  id,
  placeholder,
  type,
  error,
  register,
  onToggle,
  isVisible,
}: {
  label: string;
  id: string;
  placeholder: string;
  type: "text" | "password";
  error?: string;
  register: UseFormRegisterReturn;
  onToggle: () => void;
  isVisible: boolean;
}) => {
  return (
    <div className="rounded-[14px] border border-[#D4AF37]/35 p-5 sm:p-6">
      <label
        htmlFor={id}
        className="mb-5 block text-base font-normal text-[#FFFAF0]"
        style={{ fontFamily: "'Lora', serif" }}
      >
        {label}
      </label>

      <div className="relative">
        <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-[#FFFAF0]/80" />

        <input
          id={id}
          type={type}
          placeholder={placeholder}
          {...register}
          className={`h-14 w-full rounded-md border bg-[#6A0E69] px-12 pr-14 text-base tracking-[8px] text-[#FFFAF0] outline-none placeholder:text-[#BFA7C0] transition-all duration-300 focus:border-[#FFD700] focus:shadow-[0_0_0_3px_rgba(255,215,0,0.12)] ${
            error ? "border-[#E0115F]" : "border-[#B8860B]/30"
          }`}
          style={{ fontFamily: "'Lora', serif" }}
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-[#BFA7C0] transition-colors hover:text-[#FFD700]"
          aria-label={isVisible ? "Hide password" : "Show password"}
        >
          {isVisible ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      {error && (
        <p
          className="mt-2 text-sm text-[#FFD700]"
          style={{ fontFamily: "'Lora', serif" }}
        >
          {error}
        </p>
      )}
    </div>
  );
};
