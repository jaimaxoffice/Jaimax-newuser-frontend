import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi";  
export const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRound: builder.query({
      query: () => ({
        url: "/icoRound/getRounds",
        method: "GET",
      }),
    }),
    getAdminSettings: builder.query({
      query: () => ({
        url: "/Admin/get_settings",
        method: "GET",
      }),
    }),
    userData: builder.query({
      query: () => ({
        url: "/user/userDetails",
        method: "GET",
      }),
      providesTags: ["updateDetails"],
    }),

    addOrder: builder.mutation({
      query: (data) => ({
        url: "/order/addOrder",
        method: "POST",
        body: { ...data },
      }),
    }),
    createPayment: builder.mutation({
      query: (data) => ({
        url: "payment/create_payment",
        method: "POST",
        body: { ...data },
      }),
    }),
    createPaypalOrder: builder.mutation({
      query: (data) => ({
        url: "paypal/create-paypal-order",
        method: "POST",
        body: { ...data },
      }),
    }),
    proceedOrder: builder.mutation({
      query: (data) => ({
        url: "/order/proceedOrder",
        method: "POST",
        body: { ...data },
      }),
    }),
    getAnnounce: builder.query({
      query: () => ({
        url: "/announcements/get",
        method: "GET",
      }),
    }),
    // getRedeem: builder.mutation({
    //   query: () => ({
    //     url: "/User/reedem-welcome-bonus",
    //     method: "GET",
    //   }),
    // }),

   
  }),
});

export const {
  useGetRoundQuery,
  useGetAdminSettingsQuery,
  useUserDataQuery,
  useAddOrderMutation,
  useProceedOrderMutation,
  useCreatePaymentMutation,
  useCreatePaypalOrderMutation,
  useGetAnnounceQuery,
  // useGetRedeemMutation ,
} = dashboardApiSlice;