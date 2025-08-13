import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi";

export const userCryptoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: `/register`,
        method: "POST",
        body: data,
      }),
    }),
    getUserDetails: builder.mutation({
      query: ({ userId }) => ({
        url: `/order/get-wallet-details`,
        method: "POST",
        body: { userId },
      }),
    }),
    exchangeInrToCrypto: builder.mutation({
      query: ({ userId, inrAmount }) => ({
        url: `/order/INRExchange`,
        method: "POST",
        body: { userId, inrAmount },
      }),
    }),
    exchangeCrypto: builder.mutation({
      query: ({ userId, tokenName, tokensSent, }) => ({
        url: `/order/CryptoExchange`,
        method: "POST",
        body: { userId, tokenName, tokensSent },
      }),
    }),
    awardJmcToUser: builder.mutation({
      query: ({ userId, eqJMC,swappedTokenCount,swappedTokenType,adminTransactionHash,swapType,requestedAmountINR,gasFee }) => ({
        url: `/order/award-jmc`,
        method: "POST",
        body: { userId, eqJMC,swappedTokenCount ,swappedTokenType,adminTransactionHash,swapType,requestedAmountINR,gasFee},
      }),
    }),
    processBinanceExchange: builder.mutation({
      query: ({ chainId, txHash }) => ({
        url: `/order/binanceExchange`,
        method: "POST",
        body: { chainId, txHash },
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useGetUserDetailsMutation,
  useExchangeInrToCryptoMutation,
  useExchangeCryptoMutation,
  useAwardJmcToUserMutation,
  useProcessBinanceExchangeMutation,
} = userCryptoApiSlice;