import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi";

export const p2pApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    buyP2P: builder.mutation({
      query: ({ sellerUsername, buyInr, tradeType }) => ({
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
      query: ({ sellerUsername, buyInr, tradeType }) =>
        `p2p/p2p-quote?sellerUsername=${sellerUsername}&buyInr=${buyInr}&tradeType=${tradeType}`,
    }),

    getP2PHistorySeller: builder.query({
      query: ({ page = 1, limit = 10, tradeType } = {}) =>
        `p2p/seller-p2p-history?page=${page}&limit=${limit}&tradeType=${tradeType}`,
      providesTags: ["P2PHistory"],
    }),
    getP2PHistoryBuyer: builder.query({
      query: ({ page = 1, limit = 10, tradeType } = {}) =>
        `p2p/buyer-p2p-history?page=${page}&limit=${limit}&tradeType=${tradeType}`,
      providesTags: ["P2PHistory"],
    }),
    sellToCompany: builder.query({
      query: () =>
        "p2p/sell-to-company",
      providesTags: ["P2PHistory"],
    }),
  }),
});

export const {
  useBuyP2PMutation,
  useGetP2PQuoteQuery,
  useLazyGetP2PQuoteQuery,
  useGetP2PHistoryBuyerQuery,
  useGetP2PHistorySellerQuery,
  useSellToCompanyQuery,
  useLazySellToCompanyQuery,
} = p2pApiSlice;
