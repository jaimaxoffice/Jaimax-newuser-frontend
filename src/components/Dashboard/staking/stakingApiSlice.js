// src/redux/api/stakingApiSlice.js
import { apiSlice } from "../../../ApiSliceComponent/jaiMaxApi";

export const stakingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Dashboard
    getStakingDashboard: builder.query({
      query: () => ({
        url: `/staking/dashboard-details`,
        method: "GET",
      }),
    }),

    // Staking Rewards Logs
        getStakingRewards: builder.query({
  query: ({ page = 1, limit = 20, orderId } = {}) => ({
    url: `/staking/logs/staking-rewards`,
    method: "GET",
    params: { page, limit, ...(orderId && { orderId }) },
  }),
}),

    // Referral Rewards Logs  
    getReferralRewards: builder.query({
      query: ({ page = 1, limit = 20 } = {}) => ({
        url: `/staking/logs/referral-rewards`,
        method: "GET",
        params: { page, limit },
      }),
    }),
    
  }),
});

export const { 
  useGetStakingDashboardQuery,
  useGetStakingRewardsQuery,
  useGetReferralRewardsQuery 
} = stakingApiSlice;