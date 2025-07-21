import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi";

export const withdrawApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        withdrawHistory: builder.query({
            query: (queryParams) => ({
              url: `/payment/withdraw/withdrawHistory?${queryParams}`,
              method: 'GET', 
            }),
          }),
          withdrawRequestList: builder.query({
            query: (queryParams) => ({
              url: `/payment/withdraw/withdrawList?${queryParams}`,
              method: 'GET', 
            }),
          }),
       
          withdrawRequest:builder.mutation({
            query:(data) => ({
              url: '/payment/withdraw/WithdrawReq',
                method:"POST",
                body:{...data}
            })
        }),
        calculateWithdraw:builder.mutation({
          query:(data) => ({
            url: '/payment/withdraw/WithdrawCalculate',
              method:"POST",
              body:{...data}
          })
      }),
        
        withdrawCalculate: builder.query({
          query: () => ({
            url: "/payment/withdraw/withdrawCalculate",
            method: "GET",
          }),
        }),
        

        getSetting: builder.query({
          query: () => ({
            url: "/settings",
            method: "GET",
          }),
        }),
        
        
    })
})

export const { useWithdrawHistoryQuery ,useWithdrawRequestListQuery, useWithdrawRequestMutation , useWithdrawCalculateQuery,  useCalculateWithdrawMutation,  useGetSettingQuery} = withdrawApiSlice;



