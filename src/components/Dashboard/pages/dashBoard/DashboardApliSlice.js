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
    getRegisterBonus: builder.mutation({
      query: (jmc) => ({
        url: `/user/get-welcome-bonus`,
        method: "POST",
        body: { jmc },
      }),
    }),
    getBonusLogs: builder.query({
      query: () => ({
        url: `/user/user-registration-bonuslogs?${queryParams}`,
        method: "GET",
      }),
    }),
    
    // ✅ Handle nested result.result and convert hex to decimal
    getHolderCount: builder.query({
      queryFn: async (tokenAddress) => {
        try {
          const response = await fetch(
            "https://bsc-mainnet.nodereal.io/v1/708d964aa8f046bf9994305d4190ac46",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                jsonrpc: "2.0",
                method: "nr_getTokenHolderCount",
                params: [tokenAddress],
                id: 1,
              }),
            }
          );

          const data = await response.json();

          if (data.error) {
            return { error: { status: 'CUSTOM_ERROR', data: data.error } };
          }

          // Handle nested result.result structure and convert hex to decimal
          const hexValue = data.result?.result || data.result;
          const decimalValue = hexValue ? parseInt(hexValue, 16) : null;

          return { data: decimalValue };
        } catch (error) {
          return { 
            error: { 
              status: 'FETCH_ERROR', 
              error: error.message 
            } 
          };
        }
      },
    }),
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
  useGetRegisterBonusMutation,
  useGetBonusLogsQuery,
  useGetHolderCountQuery,
} = dashboardApiSlice;