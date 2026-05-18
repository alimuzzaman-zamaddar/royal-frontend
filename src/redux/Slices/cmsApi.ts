import { apiSlice } from "./apiSlice";

export type HomeCmsResponse = {
  success: boolean;
  message: string;
  data: Record<string, unknown>;
  code?: number;
};

export const cmsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHomeCms: builder.query<HomeCmsResponse, void>({
      query: () => ({
        url: "/cms/page/home",
        method: "GET",
        includeToken: false,
      }),
    }),
  }),
});

export const { useGetHomeCmsQuery } = cmsApi;