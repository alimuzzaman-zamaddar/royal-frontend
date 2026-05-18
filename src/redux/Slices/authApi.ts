import { apiSlice } from "../Slices/apiSlice";

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type RegisterResponse = {
  success: boolean;
  message: string;
  data: {
    otp: number;
  };
  code: number;
};

export type VerifyOtpPayload = {
  email: string;
  otp: string;
};

export type VerifyOtpResponse = {
  success: boolean;
  message: string;
  data?: {
    token?: string;
    user?: Record<string, unknown>;
  };
  code: number;
};

export type ResendOtpPayload = {
  email: string;
};

export type ResendOtpResponse = {
  success: boolean;
  message: string;
  data?: {
    otp?: number;
  };
  code: number;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  success: boolean;
  message: string;
  data?: {
    token?: string;
    access_token?: string;
    user?: Record<string, unknown>;
  };
  token?: string;
  access_token?: string;
  user?: Record<string, unknown>;
  authorization?: {
    token?: string;
  };
  code?: number;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ForgotPasswordResponse = {
  success: boolean;
  message: string;
  data?: unknown;
  code?: number;
};
export type VerifyResetOtpPayload = {
  email: string;
  otp: string;
};

export type VerifyResetOtpResponse = {
  success: boolean;
  message: string;
  data?: unknown;
  code?: number;
};

export type ResetResendOtpPayload = {
  email: string;
};

export type ResetResendOtpResponse = {
  success: boolean;
  message: string;
  data?: {
    otp?: number;
  };
  code?: number;
};

export type ResetPasswordPayload = {
  email: string;
  otp: string;
  new_password: string;
  new_password_confirmation: string;
};

export type ResetPasswordResponse = {
  success: boolean;
  message: string;
  data?: unknown;
  code?: number;
};

export type UserProfile = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  avatar_path: string | null;
  gender: string | null;
};

export type ProfileResponse = {
  success: boolean;
  message: string;
  data: UserProfile;
  code: number;
};

export type UpdateProfileResponse = {
  success: boolean;
  message: string;
  data?: {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    avatar_path: string | null;
    gender: string | null;
  };
  code?: number;
};

export type ChangePasswordPayload = {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
};

export type ChangePasswordResponse = {
  success: boolean;
  message: string;
  data?: unknown;
  code?: number;
};

export type LogoutResponse = {
  success: boolean;
  message: string;
  data?: unknown;
  code?: number;
};
export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<RegisterResponse, RegisterPayload>({
      query: (data) => ({
        url: "/register",
        method: "POST",
        data,
        includeToken: false,
      }),
    }),

    verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpPayload>({
      query: (data) => ({
        url: "/verify-otp",
        method: "POST",
        data,
        includeToken: false,
      }),
    }),

    resendOtp: builder.mutation<ResendOtpResponse, ResendOtpPayload>({
      query: (data) => ({
        url: "/resend-otp",
        method: "POST",
        data,
        includeToken: false,
      }),
    }),

    loginUser: builder.mutation<LoginResponse, LoginPayload>({
      query: (data) => ({
        url: "/login",
        method: "POST",
        data,
        includeToken: false,
      }),
    }),

    forgotPassword: builder.mutation<
      ForgotPasswordResponse,
      ForgotPasswordPayload
    >({
      query: (data) => ({
        url: "/forgot-password",
        method: "POST",
        data,
        includeToken: false,
      }),
    }),

    verifyResetOtp: builder.mutation<
      VerifyResetOtpResponse,
      VerifyResetOtpPayload
    >({
      query: (data) => ({
        url: "/verify-reset-otp",
        method: "POST",
        data,
        includeToken: false,
      }),
    }),
    resetResendOtp: builder.mutation<
      ResetResendOtpResponse,
      ResetResendOtpPayload
    >({
      query: (data) => ({
        url: "/reset-resend-otp",
        method: "POST",
        data,
        includeToken: false,
      }),
    }),

    resetPassword: builder.mutation<
      ResetPasswordResponse,
      ResetPasswordPayload
    >({
      query: (data) => ({
        url: "/reset-password",
        method: "POST",
        data,
        includeToken: false,
      }),
    }),
    getProfile: builder.query<ProfileResponse, void>({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
    }),

    updateProfile: builder.mutation<UpdateProfileResponse, FormData>({
      query: (formData) => ({
        url: "/update-profile",
        method: "POST",
        data: formData,
      }),
    }),

    changePassword: builder.mutation<
      ChangePasswordResponse,
      ChangePasswordPayload
    >({
      query: (data) => ({
        url: "/change-password",
        method: "POST",
        data,
      }),
    }),
    logoutUser: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useLoginUserMutation,
  useForgotPasswordMutation,
  useVerifyResetOtpMutation,
  useResetResendOtpMutation,
  useResetPasswordMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useLogoutUserMutation,
} = authApi;
