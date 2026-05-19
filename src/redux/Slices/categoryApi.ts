import { apiSlice } from "./apiSlice";

export type CategoryItem = {
  id: number;
  title: string;
  slug: string;
};

export type CategoriesResponse = {
  success: boolean;
  message: string;
  data: CategoryItem[];
  code: number;
};

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<CategoriesResponse, void>({
      query: () => ({
        url: "/categories",
        method: "GET",
        includeToken: false,
      }),
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;