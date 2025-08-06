import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi";
export const userShareApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserInfo: builder.mutation({
      query: ({ username }) => {
        if (!username) {
          throw new Error("Username is required");
        }
      
        return {
          url: `admin/share-holders/user-eligibility-shareholder`,
          method: "POST",
          body: { username },
        };
      }
      
      
    }),
  }),
});
export const { useGetUserInfoMutation } = userShareApiSlice;

