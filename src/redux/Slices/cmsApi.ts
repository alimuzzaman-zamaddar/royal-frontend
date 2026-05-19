/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "./apiSlice";

export type HomeCmsResponse = {
  success: boolean;
  message: string;
  data: Record<string, unknown>;
  code?: number;
};

export type RoyalExchangeHeroSection = {
  title: string;
  subtitle: string;
  background_image: string;
};

export type RoyalExchangeAboutSection = {
  description: string;
  image: string;
};

export type RoyalExchangeCmsData = {
  hero_section: RoyalExchangeHeroSection;
  about_section: RoyalExchangeAboutSection;
};

export type RoyalExchangeCmsResponse = {
  success: boolean;
  message: string;
  data: RoyalExchangeCmsData;
  code: number;
};

export type ShopHeroSection = {
  title: string;
  subtitle: string;
  background_image: string;
};

export type ShopCmsData = {
  hero_section: ShopHeroSection;
};

export type ShopCmsResponse = {
  success: boolean;
  message: string;
  data: ShopCmsData;
  code: number;
};

export type ServiceInnerItem = {
  id: number;
  service_category_id: number;
  title: string;
  description: string;
};

export type ServiceCategoryItem = {
  id: number;
  title: string;
  icon: string;
  description: string;
  color_code: string;
  services: ServiceInnerItem[];
};

export type ServicesHeroSection = {
  title: string;
  subtitle: string;
  background_image: string;
};

export type ServicesEngageSection = {
  title: string;
  subtitle: string;
  description: string;
  items: {
    title: string;
  }[];
};

export type ServicesSubFooterSection = {
  title: string;
  subtitle: string;
  description: string;
  button_text: string;
  button_link: string;
};

export type ServicesCmsData = {
  hero_section: ServicesHeroSection;
  engage_section: ServicesEngageSection;
  sub_footer_section: ServicesSubFooterSection;
  services: ServiceCategoryItem[];
};

export type ServicesCmsResponse = {
  success: boolean;
  message: string;
  data: ServicesCmsData;
  code: number;
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

    getRoyalExchangeCms: builder.query<RoyalExchangeCmsResponse, void>({
      query: () => ({
        url: "/cms/page/royal_exchange",
        method: "GET",
        includeToken: false,
      }),
    }),

    getShopCms: builder.query<ShopCmsResponse, void>({
  query: () => ({
    url: "/cms/page/shop",
    method: "GET",
    includeToken: false,
  }),
}),

getServicesCms: builder.query<ServicesCmsResponse, void>({
  query: () => ({
    url: "/cms/page/services",
    method: "GET",
    includeToken: false,
  }),
}),

getBooksCms: builder.query<any, void>({
  query: () => ({
    url: "/cms/page/books",
    method: "GET",
    includeToken: false,
  }),
}),
getLineageCms: builder.query<any, void>({
  query: () => ({
    url: "/cms/page/lineage",
    method: "GET",
    includeToken: false,
  }),
}),
getContactCms: builder.query<any, void>({
  query: () => ({
    url: "/cms/page/contact",
    method: "GET",
    includeToken: false,
  }),
}),
  }),
});

export const { useGetHomeCmsQuery, useGetRoyalExchangeCmsQuery, useGetShopCmsQuery, useGetServicesCmsQuery, useGetBooksCmsQuery, useGetLineageCmsQuery, useGetContactCmsQuery } = cmsApi;
