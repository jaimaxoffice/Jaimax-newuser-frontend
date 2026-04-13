

import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi";

export const miningApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // ============ PUBLIC ============
    // GET /mine-jmc/slots-info
    getSlotsInfo: builder.query({
      query: () => ({
        url: "/mine-jmc/slots-info",
        method: "GET",
      }),
    }),

    // ============ USER ENDPOINTS ============
    
    // GET /mine-jmc/today-mine-info
    getTodayMineInfo: builder.query({
      query: () => ({
        url: "/mine-jmc/today-mine-info",
        method: "GET",
      }),
      providesTags: ["TodayMineInfo"],
    }),

    // POST /mine-jmc/create-mine-wallet
    createMineWallet: builder.mutation({
      query: () => ({
        url: "/mine-jmc/create-mine-wallet",
        method: "POST",
      }),
      invalidatesTags: ["MineWallet"],
    }),

    // GET /mine-jmc/get-mine-wallet-details
    getMineWalletDetails: builder.query({
      query: () => ({
        url: "/mine-jmc/get-mine-wallet-details",
        method: "GET",
      }),
      providesTags: ["MineWallet"],
    }),

    // POST /mine-jmc/mine
    mineJMC: builder.mutation({
      query: (data) => ({
        url: "/mine-jmc/mine",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["MineWallet", "MineLogs", "TodayMineInfo"],
    }),

    // GET /mine-jmc/get-mine-logs
    getUserMineLogs: builder.query({
      query: (params) => ({
        url: "/mine-jmc/get-mine-logs",
        method: "GET",
        params: params, // { page, limit, startDate, endDate, etc. }
      }),
      providesTags: ["MineLogs"],
    }),

    // GET /mine-jmc/get-mine-wallet-txs
    getUserWalletTxs: builder.query({
      query: (params) => ({
        url: "/mine-jmc/get-mine-wallet-txs",
        method: "GET",
        params: params, // { page, limit, type, etc. }
      }),
      providesTags: ["WalletTxs"],
    }),

    // GET /mine-jmc/get-referral-bonus
    getUserReferralBonus: builder.query({
      query: (params) => ({
        url: "/mine-jmc/get-referral-bonus",
        method: "GET",
        params: params,
      }),
      providesTags: ["ReferralBonus"],
    }),

    // ============ ADMIN ENDPOINTS ============
    
    // GET /mine-jmc/admin/get-mine-logs
    getAdminMineLogs: builder.query({
      query: (params) => ({
        url: "/mine-jmc/admin/get-mine-logs",
        method: "GET",
        params: params, // { page, limit, userId, startDate, endDate, etc. }
      }),
      providesTags: ["AdminMineLogs"],
    }),

    // GET /mine-jmc/admin/get-mine-wallet-txs
    getAdminWalletTxs: builder.query({
      query: (params) => ({
        url: "/mine-jmc/admin/get-mine-wallet-txs",
        method: "GET",
        params: params,
      }),
      providesTags: ["AdminWalletTxs"],
    }),

    // GET /mine-jmc/admin/get-referral-bonus
    getAdminReferralBonus: builder.query({
      query: (params) => ({
        url: "/mine-jmc/admin/get-referral-bonus",
        method: "GET",
        params: params,
      }),
      providesTags: ["AdminReferralBonus"],
    }),

  }),
});

export const {
  // Public
  useGetSlotsInfoQuery,
  
  // User
  useGetTodayMineInfoQuery,
  useCreateMineWalletMutation,
  useGetMineWalletDetailsQuery,
  useMineJMCMutation,
  useGetUserMineLogsQuery,
  useGetUserWalletTxsQuery,
  useGetUserReferralBonusQuery,
  
  // Admin
  useGetAdminMineLogsQuery,
  useGetAdminWalletTxsQuery,
  useGetAdminReferralBonusQuery,
} = miningApiSlice;