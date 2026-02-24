import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  // credentials: "include",

  prepareHeaders: (headers, { getState }) => {
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT,PATCH, DELETE, OPTIONS"
    );

    const token = Cookies.get("token");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

/**
 * Custom base query to handle token refresh and retry logic.
 */
const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // If a 408 error occurs, try to refresh the token
  if (result?.error?.data?.status_code === 408) {
    const refreshResult = await baseQuery(
      { url: "/Auth/refreshToken", method: "GET" },
      api,
      extraOptions
    );


    if (refreshResult?.data) {
      // Store the new token
      // localStorage.setItem("token", refreshResult.data?.data.token);
      Cookies.set("token", refreshResult.data?.data.token, { expires: 7 });
      // Retry the original query with the new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Token refresh failed
      return refreshResult;
    }
  }

  // If a 401 error occurs, logout or handle it (custom behavior)
  if (result?.error?.data?.status_code === 401) {
    window.location.href = "/login";
    // localStorage.clear();
    Object.keys(Cookies.get()).forEach(function(cookieName) {
  Cookies.remove(cookieName);
});
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["getComment", "updateDetails", "getTicket", "shareholder","WealthPlan","WITHDRAW_HISTORY", "WITHDRAW_LIST","withdrawal"],
  refetchOnFocus: false, 
  refetchOnReconnect: true,
  endpoints: (builder) => ({}),
});

export const { usePrefetch } = apiSlice;







