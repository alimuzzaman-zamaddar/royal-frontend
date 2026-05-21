/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "./apiSlice";

type SubmitStoryRequest = FormData;

type SubmitStoryResponse = {
  success: boolean;
  message: string;
  data?: unknown;
  code?: number;
};

export const storyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    submitStory: builder.mutation<SubmitStoryResponse, SubmitStoryRequest>({
      query: (formData) => ({
        url: "/story/submit",
        method: "POST",
        data: formData,
        includeToken: true,
      }),
    }),

    subscribeNewsletter: builder.mutation<any, any>({
      query: (data) => ({
        url: "/newsletter/subscribe",
        method: "POST",
        data,
        includeToken: true,
      }),
    }),

    joinExchange: builder.mutation<any, any>({
      query: (payload) => ({
        url: "/exchange/join",
        method: "POST",
        data: payload,
        includeToken: true,
      }),
    }),
  }),
});

export const { useSubmitStoryMutation, useSubscribeNewsletterMutation, useJoinExchangeMutation } =
  storyApi;
