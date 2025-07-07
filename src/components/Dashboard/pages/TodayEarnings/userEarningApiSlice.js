import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi";

export const userEarningApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodayEarningStatus: builder.mutation({
      query: ({ id }) => {
        // console.debug("getTodayEarningStatus called with ID:", id);

        if (!id) {
          // console.error("User ID is missing in getTodayEarningStatus");
          throw new Error("User ID is required");
        }

        const queryObject = {
          url: `/user/today-earning-status`,
          method: "POST",
          body: { id },
        };

        // console.debug("getTodayEarningStatus query object:", queryObject);

        return queryObject;
      },
      // Optional: Add logging for success or error states
      async onQueryStarted(arg, { queryFulfilled }) {
        // console.debug("Mutation started with arg:", arg);
        try {
          const { data } = await queryFulfilled;
          // console.debug("Mutation success:", data);
        } catch (error) {
          console.error("Mutation failed:", error);
        }
      },
    }),
    getActivePaymentGateway: builder.query({
      query: () => ({
        url: `/user/get-active-paymentgateway`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetTodayEarningStatusMutation,useGetActivePaymentGatewayQuery } = userEarningApiSlice;
