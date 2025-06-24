
// import { apiSlice } from "../../storeJs/api/JaimaxApi"; 

// export const myTeamApiSlice = apiSlice.injectEndpoints({
//     endpoints: (builder) => ({
//           userDetails: builder.query({
//             query: (queryParams) => ({
//               url: `/user/userReport?${queryParams}`,
//               method: 'GET', 
//             }),
//           })
        
//     })
// })

// export const { useUserDetailsQuery } = myTeamApiSlice;
 

<<<<<<< HEAD

import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi";  



=======
import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi";  
// import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi"; 
>>>>>>> 42822ca8648f5a66f71d825efd501d2d2967e8e7

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
