// src/redux/api/wpStakingApiSlice.js
// import { apiSlice } from "../../../ApiSliceComponent/jaiMaxApi";

import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi";

export const wpStakingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // WP Staking Wallet
    getWpStakingWallet: builder.query({
      query: () => ({
        url: `/wp-staking/wallet`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetWpStakingWalletQuery } = wpStakingApiSlice;
