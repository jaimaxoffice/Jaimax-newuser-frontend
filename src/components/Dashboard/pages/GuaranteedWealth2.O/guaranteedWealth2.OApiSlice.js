// guaranteedWealth2_OApiSlice.js
import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi";

export const guaranteedWealth2_OApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrdersAbove3L: builder.query({
      query: () => ({
        url: "/guaranted-wealth-2-0/get-orders-above300k",
        method: "GET",
      }),
      providesTags: ["WealthPlan2"],
    }),
    getAllWealth2_OPlanOrders: builder.query({
      query: () => ({
        url: "/guaranted-wealth-2-0/get-all-wealth-plan-ordres-2",
        method: "GET",
      }),
      providesTags: ["WealthPlan2"],
    }),
    activateTheWealth2_OPlan: builder.mutation({
      query: (orderId) => ({
        url: "/guaranted-wealth-2-0/activate-gaurnteed-wealth-paln-2",
        method: "POST",
        body: { orderId },
      }),
      invalidatesTags: ["WealthPlan2"],
    }),
    deActivateTheWealth2_OPlan: builder.mutation({
      query: (orderId) => ({
        url: "/guaranted-wealth-2-0/deactivate-gaurnteed-wealth-paln-2",
        method: "POST",
        body: { orderId },
      }),
      invalidatesTags: ["WealthPlan2"],
    }),
    getAllCompletedWealth2_OPlanOrders: builder.query({
      query: () => ({
        url: "/guaranted-wealth-2-0/get-all-wealth-completed-ordres-2",
        method: "GET",
      }),
      providesTags: ["WealthPlan2"],
    }),
    getWealth2_OOrderTransactions: builder.query({
      query: ({ orderId, page = 1, limit = 3 }) => ({
        url: `/guaranted-wealth-2-0/wealth-order-transactions-2`,
        method: "GET",
        params: { orderId, page, limit },
      }),
      providesTags: ["WealthPlan2"],
    }),
  }),
});

export const {
  useGetOrdersAbove3LQuery,
  useGetAllWealth2_OPlanOrdersQuery,
  useActivateTheWealth2_OPlanMutation,
  useDeActivateTheWealth2_OPlanMutation,
  useGetAllCompletedWealth2_OPlanOrdersQuery,
  useGetWealth2_OOrderTransactionsQuery,
} = guaranteedWealth2_OApiSlice;