import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi";

export const miningApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // POST /mine-jmc/create-mine-wallet
    createMineWallet: builder.mutation({
      query: () => ({
        url: "/mine-jmc/create-mine-wallet",
        method: "POST",
      }),
    }),

    // GET /mine-jmc/get-mine-wallet-details
    getMineWalletDetails: builder.query({
      query: () => ({
        url: "/mine-jmc/get-mine-wallet-details",
        method: "GET",
      }),
    }),

    // POST /mine-jmc/mine
    mineJMC: builder.mutation({
      query: (data) => ({
        url: "/mine-jmc/mine",
        method: "POST",
        body: data,
      }),
    }),

  }),
});

export const {
  useCreateMineWalletMutation,
  useGetMineWalletDetailsQuery,
  useMineJMCMutation,
} = miningApiSlice;