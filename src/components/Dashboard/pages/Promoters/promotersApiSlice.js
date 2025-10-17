import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi";

export const promotersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPromoters: builder.query({
      query: ({ page = 1, limit = 10 } = {}) => ({
        url: `/User/promoter-eligibility?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
    redeemPromoterBadge: builder.mutation({
      query: () => ({
        url: `/User/reedem-promoter-badge`,
        method: "GET",
      }),
      }),
    getAllBelovedPromoters: builder.query({
      query: () => ({
        url: `/User/promoter-list`,
        method: "GET",
      }),
  }),
}),
});

// ✅ Correct export
export const { useGetAllPromotersQuery ,useRedeemPromoterBadgeMutation,useGetAllBelovedPromotersQuery} = promotersApiSlice;
