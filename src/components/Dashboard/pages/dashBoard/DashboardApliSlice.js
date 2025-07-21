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
        url: "/settings",
        method: "GET",
      }),
    }),
    userData: builder.query({
      query: () => ({
        url: "/Auth/userDetails",
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

    // userData:builder.mutation({
    //   query:(data) =>({
    //     url:"/user/userDetails",
    //     method:"POST",
    //     body:{...data}
    //   })
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
} = dashboardApiSlice;