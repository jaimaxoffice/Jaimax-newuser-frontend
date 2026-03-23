// src/redux/api/usdtWithdrawApiSlice.js
import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi";

export const usdtWithdrawApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ===============================
    // GET: Withdraw History (ALL TOKENS)
    // ===============================
    usdtWithdrawHistory: builder.query({
      query: (queryParams) => ({
        url: `/usd-withdrawal/usdt-withdraw-history?${queryParams}`,
        method: "GET",
      }),
      providesTags: ["withdrawal"],
    }),

    // ===============================
    // GET: INR → TOKEN CONVERSION PREVIEW
    // ===============================
    inrToTokenPreview: builder.query({
      query: (token) => ({
        url: `/usd-withdrawal/conversion-inr-token?token=${token}`,
        method: "GET",
      }),
      providesTags: ["withdrawal"],
    }),

    // ===============================
    // POST: TOKEN WITHDRAW REQUEST
    // ===============================
    usdtWithdrawRequest: builder.mutation({
      query: (data) => ({
        url: "/usd-withdrawal/usdt-withdraw-req",
        method: "POST",
        body: { ...data }, // { token, amount, walletAddress }
      }),
      invalidatesTags: ["withdrawal"]
    }),

    // ===============================
    // POST: TOKEN WITHDRAW PREVIEW
    // ===============================
    previewTokenWithdraw: builder.mutation({
      query: (data) => ({
        url: "/usd-withdrawal/preview-usdt-withdraw",
        method: "POST",
        body: { ...data }, // { token, amount }
      }),
      // invalidateTags: ["withdrawal"]
    }),
  }),
});

export const {
  useUsdtWithdrawHistoryQuery,
  useInrToTokenPreviewQuery,
  useUsdtWithdrawRequestMutation,
  usePreviewTokenWithdrawMutation,
} = usdtWithdrawApiSlice;


