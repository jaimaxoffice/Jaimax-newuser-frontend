import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi";

export const p2pApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    buyP2P: builder.mutation({
      query: ({ sellerUsername, buyInr }) => ({
        url: "p2p/buy-p2p",
        method: "POST",
        body: {
          sellerUsername,
          buyInr,
          tradeType,
        },
      }),
      invalidatesTags: ["P2PHistory"],
    }),

    getP2PQuote: builder.query({
      query: ({ sellerUsername, buyInr }) =>
        `p2p/p2p-quote?sellerUsername=${sellerUsername}&buyInr=${buyInr}`,
    }),

    getMyP2PHistory: builder.query({
      query: ({ page = 1, limit = 10 } = {}) =>
        `p2p/my-p2p-history?page=${page}&limit=${limit}`,
      providesTags: ["P2PHistory"],
    }),
  }),
});

export const {
  useBuyP2PMutation,
  useGetP2PQuoteQuery,
  useLazyGetP2PQuoteQuery,
  useGetMyP2PHistoryQuery,
} = p2pApiSlice;
