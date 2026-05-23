/* eslint-disable @typescript-eslint/no-explicit-any */
// src/redux/Slices/productApi.ts

import { apiSlice } from "./apiSlice";

export type ApiProductCategory = {
  id: number;
  title: string;
};

export type ApiProduct = {
  [x: string]: any;
  id: number;
  title: string;
  slug: string;
  short_description: string;
  badge: string | null;
  thumbnail: string | null;
  product_type: "internal" | "external";
  product_link: string | null;
  original_price: string | null;
  discount_price: string | null;
  soft_copy_price: string | null;
  soft_copy_discount_price: string | null;
  hard_copy_price: string | null;
  hard_copy_discount_price: string | null;
  rating_count: number;
  avg_rating: number;
  category: ApiProductCategory;
};

export type ApiProductDetails = ApiProduct & {
  description: string | null;
  stock: number;
  images: Array<string | { image?: string; path?: string; url?: string }>;
  tags: string[];
};

export type ProductGroup = {
  category: string;
  products: ApiProduct[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    next_page_url: string | null;
    prev_page_url: string | null;
  };
};

export type ProductsResponse = {
  success: boolean;
  message: string;
  data: ProductGroup[];
  code: number;
};



export type ProductDetailsResponse = {
  success: boolean;
  message: string;
  data: {
    product: ApiProductDetails;
    related: ApiProduct[];
  };
  code: number;
};

export type ProductsQueryParams = {
  categories?: number[];
  search?: string;
  sort?: "low_to_high" | "high_to_low" | "newest";
  direction?: "asc" | "desc";
  min_price?: number;
  max_price?: number;
};

const buildProductParams = (query: ProductsQueryParams) => {
  const params = new URLSearchParams();

  query.categories?.forEach((categoryId) => {
    params.append("categories[]", String(categoryId));
  });

  if (query.search) params.append("search", query.search);
  if (query.sort) params.append("sort", query.sort);
  if (query.direction) params.append("direction", query.direction);

  if (query.min_price !== undefined) {
    params.append("min_price", String(query.min_price));
  }

  if (query.max_price !== undefined && Number.isFinite(query.max_price)) {
    params.append("max_price", String(query.max_price));
  }

  return params;
};

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, ProductsQueryParams>({
      query: (queryParams) => ({
        url: "/products",
        method: "GET",
        params: buildProductParams(queryParams),
        includeToken: false,
      }),
    }),

    getProductDetails: builder.query<ProductDetailsResponse, string>({
      query: (slug) => ({
        url: `/product/${slug}`,
        method: "GET",
        includeToken: false,
      }),
    }),
    getOrderHistoryList: builder.query<any, any>({
      query: () => ({
        url: `/orders`,
        method: "GET",
        includeToken: true,
      }),
    }),

    applyPromo: builder.mutation<any, { code: string; subtotal: number }>({
      query: (body) => ({
        url: "/promo/apply",
        method: "POST",
        data: body,
        includeToken: true,
      }),
    }),

    sendReview: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/orders/${payload.order_item_ids[0]}/send-rating`,
        method: "PUT",
        data: payload,
        includeToken: true, // attach bearer token
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useGetOrderHistoryListQuery,
  useApplyPromoMutation,
  useSendReviewMutation,
} = productApi;
