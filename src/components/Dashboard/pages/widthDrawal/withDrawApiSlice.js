import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi";

export const withdrawApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    withdrawHistory: builder.query({
      query: (queryParams) => ({
        url: `/withdraw/withdrawHistory?${queryParams}`,
        method: "GET",
      }),
      providesTags: ["WITHDRAW_HISTORY"],
    }),

    withdrawRequestList: builder.query({
      query: (queryParams) => ({
        url: `/withdraw/withdrawList?${queryParams}`,
        method: "GET",
      }),
      providesTags: ["WITHDRAW_LIST"],
    }),

    withdrawRequest: builder.mutation({
      query: (data) => ({
        url: "/withdraw/WithdrawReq",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["WITHDRAW_HISTORY", "WITHDRAW_LIST","updateDetails"],
    }),

    calculateWithdraw: builder.mutation({
      query: (data) => ({
        url: "/withdraw/WithdrawCalculate",
        method: "POST",
        body: { ...data },
      }),
    }),

    withdrawCalculate: builder.query({
      query: () => ({
        url: "/withdraw/withdrawCalculate",
        method: "GET",
      }),
    }),

    getSetting: builder.query({
      query: () => ({
        url: "/Admin/get_settings",
        method: "GET",
      }),
    }),
  }),
});


export const { useWithdrawHistoryQuery ,useWithdrawRequestListQuery, useWithdrawRequestMutation , useWithdrawCalculateQuery,  useCalculateWithdrawMutation,  useGetSettingQuery} = withdrawApiSlice;


