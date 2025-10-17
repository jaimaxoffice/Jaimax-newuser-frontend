import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi";

export const foundationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFoundation: builder.query({
      query: () => ({
        url: "/User/foundation-bonus-elegilibilty",
        method: "GET",

      }),
    }),
    redeemBadgeFoundation: builder.mutation({
      query: () => ({
        url: `/User/reedem-foundation-bonus`,
        method: "GET",
      }),
    }),
  }),
});

// ✅ Correct export
export const { useGetFoundationQuery,useRedeemBadgeFoundationMutation  } = foundationApiSlice;