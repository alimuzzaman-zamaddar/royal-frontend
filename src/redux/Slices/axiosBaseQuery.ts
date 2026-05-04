import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig, AxiosError } from "axios";
import axios from "axios";

type AxiosBaseQueryConfig = {
  baseUrl: string;
  defaultHeaders?: Record<string, string>;
};

const joinUrl = (base: string, path: string) =>
  base.replace(/\/+$/, "") + "/" + path.replace(/^\/+/, "");

const axiosBaseQuery =
  ({
    baseUrl,
    defaultHeaders = {},
  }: AxiosBaseQueryConfig): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
      includeToken?: boolean;
    },
    unknown,
    unknown
  > =>
  async ({
    url,
    method = "GET",
    data,
    params,
    headers = {},
    includeToken = true,
  }) => {
    try {
      const token = includeToken ? localStorage.getItem("token") : null;
      const isFormData =
        typeof FormData !== "undefined" && data instanceof FormData;

      const finalHeaders: AxiosRequestConfig["headers"] = {
        Accept: "application/json",
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...defaultHeaders,
        ...headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      const result = await axios({
        url: joinUrl(baseUrl, url),
        method,
        data,
        params,
        headers: finalHeaders,
      });

      return { data: result.data };
    } catch (error) {
      const err = error as AxiosError;
      return {
        error: {
          status: err.response?.status ?? 500,
          data: err.response?.data ?? err.message,
        },
      };
    }
  };

export default axiosBaseQuery;
