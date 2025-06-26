import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi";
export const userShareApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserInfo: builder.mutation({
      query: ({ username }) => {
        if (!username) {
          throw new Error("Username is required");
        }
      
        return {
          url: `/share-holders/user-eligibilty-shareholder`,
          method: "POST",
          body: { username },
        };
      }
      
      
    }),
  }),
});
export const { useGetUserInfoMutation } = userShareApiSlice;

