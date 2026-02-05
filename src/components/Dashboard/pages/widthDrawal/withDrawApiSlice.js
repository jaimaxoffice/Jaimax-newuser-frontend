// import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi";

// export const withdrawApiSlice = apiSlice.injectEndpoints({
//     endpoints: (builder) => ({
//         withdrawHistory: builder.query({
//             query: (queryParams) => ({
//               url: `/withdraw/withdrawHistory?${queryParams}`,
//               method: 'GET', 
//             }),
//           }),
//           withdrawRequestList: builder.query({
//             query: (queryParams) => ({
//               url: `/withdraw/withdrawList?${queryParams}`,
//               method: 'GET', 
//             }),
//           }),
       
//           withdrawRequest:builder.mutation({
//             query:(data) => ({
//               url: '/withdraw/WithdrawReq',
//                 method:"POST",
//                 body:{...data}
//             })
//         }),
//         calculateWithdraw:builder.mutation({
//           query:(data) => ({
//             url: '/withdraw/WithdrawCalculate',
//               method:"POST",
//               body:{...data}
//           })
//       }),
        
//         withdrawCalculate: builder.query({
//           query: () => ({
//             url: "/withdraw/withdrawCalculate",
//             method: "GET",
//           }),
//         }),
        

//         getSetting: builder.query({
//           query: () => ({
//             url: "/Admin/get_settings",
//             method: "GET",
//           }),
//         }),
        
        
//     })
// })

// export const { useWithdrawHistoryQuery ,useWithdrawRequestListQuery, useWithdrawRequestMutation , useWithdrawCalculateQuery,  useCalculateWithdrawMutation,  useGetSettingQuery} = withdrawApiSlice;



// src/redux/api/usdtWithdrawApiSlice.js
import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi";

export const usdtWithdrawApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ===============================
    // GET: Withdraw History (ALL TOKENS)
    // ===============================
    usdtWithdrawHistory: builder.query({
      query: (queryParams) => ({
        url: `/usdt-withdrawal/usdt-withdraw-history?${queryParams}`,
        method: "GET",
      }),
      providesTags: ["withdrawal"],
    }),

    // ===============================
    // GET: INR → TOKEN CONVERSION PREVIEW
    // ===============================
    inrToTokenPreview: builder.query({
      query: (token) => ({
        url: `/usdt-withdrawal/conversion-inr-token?token=${token}`,
        method: "GET",
      }),
      providesTags: ["withdrawal"],
    }),

    // ===============================
    // POST: TOKEN WITHDRAW REQUEST
    // ===============================
    usdtWithdrawRequest: builder.mutation({
      query: (data) => ({
        url: "/usdt-withdrawal/usdt-withdraw-req",
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
        url: "/usdt-withdrawal/preview-usdt-withdraw",
        method: "POST",
        body: { ...data }, // { token, amount }
      }),
    
      // invalidateTags: ["withdrawal"]
    }),
    getSetting: builder.query({
          query: () => ({
            url: "/Admin/get_settings",
            method: "GET",
          }),
        }),
  }),
});

export const {
  useUsdtWithdrawHistoryQuery,
  useInrToTokenPreviewQuery,
  useUsdtWithdrawRequestMutation,
  usePreviewTokenWithdrawMutation,
  useGetSettingQuery,
} = usdtWithdrawApiSlice;

