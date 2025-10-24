import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi";

export const guaranteedWealthApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrdersAbove25k: builder.query({
      query: () => ({
        url: "/guaranted-wealth/get-orders-above25k",
        method: "GET",
      }),
    }),
    getAllWealthPlanOrders: builder.query({
      query: () => ({
        url: "/guaranted-wealth/get-all-wealth-plan-ordres",
        method: "GET",
      }),
    }),
    activateTheWealthPlan: builder.mutation({
      query: (orderId) => ({
        url: "/guaranted-wealth/activate-gaurnteed-wealth-paln",
        method: "POST",
        body: { orderId },
      }),
    }),
    deActivateTheWealthPlan: builder.mutation({
      query: (orderId) => ({
        url: "/guaranted-wealth/deactivate-gaurnteed-wealth-paln",
        method: "POST",
        body: { orderId },
      }),
    }),
    getAllCompletedWealthPlanOrders: builder.query({
      query: () => ({
        url: "/guaranted-wealth/get-all-wealth-completed-ordres",
        method: "GET",
      }),
    }),
    getWealthOrderTransactions: builder.query({
      query: ({ orderId, page = 1, limit = 3 }) => ({
        url: `/guaranted-wealth/wealth-order-transactions`,
        method: "GET",
        params: { orderId, page, limit },
      }),
    }),

  }),
});

export const {
  useGetOrdersAbove25kQuery,
  useGetAllWealthPlanOrdersQuery,
  useActivateTheWealthPlanMutation,
  useDeActivateTheWealthPlanMutation,
  useGetAllCompletedWealthPlanOrdersQuery,
  useGetWealthOrderTransactionsQuery,
} = guaranteedWealthApiSlice;
