import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi"; 
export const walletApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    walletTransactionsList: builder.query({
      query: (queryParams) => ({
        url: `/payment/wallet/transactions?${queryParams}`,
        method: "GET",
      }),
    }),
    availableBalance: builder.query({
      query: () => ({
        url: `/payment/wallet/availableBalance`,
        method: "GET",
      }),
    }),
    addTransaction: builder.mutation({
      query: (data) => ({
        url: `/payment/wallet/addTransaction`,
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
        url: `/payment/wallet/transferBalance`,
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
