import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi"; 
export const walletApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    walletTransactionsList: builder.query({
      query: (queryParams) => ({
        url: `/wallet/transactions?${queryParams}`,
        method: "GET",
      }),
    }),
    availableBalance: builder.query({
      query: () => ({
        url: `/wallet/availableBalance`,
        method: "GET",
      }),
    }),
    addTransaction: builder.mutation({
      query: (data) => ({
        url: `/wallet/addTransaction`,
        method: "POST",
        body: data,
      }),
    }),
    createPaypalWalletOrder: builder.mutation({
      query: (data) => ({
        url: `/paypal/create-wallet-paypal-order`,
        method: "POST",
        body: data,
      }),
    }),
    transferAvailableBalance: builder.mutation({
      query: (data) => ({
        url: `/wallet/transferBalance`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useWalletTransactionsListQuery,
  useAvailableBalanceQuery,
  useAddTransactionMutation,
  useCreatePaypalWalletOrderMutation,
  useTransferAvailableBalanceMutation,
} = walletApiSlice;
