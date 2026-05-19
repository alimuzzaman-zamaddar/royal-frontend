import { apiSlice } from "./apiSlice";

type ContactSubmitRequest = {
  name: string;
  email: string;
  message: string;
};

type ContactSubmitResponse = {
  success: boolean;
  message: string;
  data?: unknown;
  code?: number;
};

export const contactApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    submitContact: builder.mutation<
      ContactSubmitResponse,
      ContactSubmitRequest
    >({
      query: (data) => ({
        url: "/contact/submit",
        method: "POST",
        data,
        includeToken: false,
      }),
    }),
  }),
});

export const { useSubmitContactMutation } = contactApi;