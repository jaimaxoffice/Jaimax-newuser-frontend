import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi"; 

export const kycApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    kycadd: builder.mutation({
      query: (data) => {
        // console.log(data); // Add logging here to check the data being sent
        return {
          url: "/kyc/submitKyc",
          method: "POST",
          body: data,
        };
      },
    }),
    getkycDetails: builder.query({
      query: (id) => {
        // console.log('Request ID:', id);
        return {
          url: `kyc/KycStatus`,
          method: "GET",
        };
      },
    }),
    getKycData: builder.mutation({
      query: (data) => ({
        url: `digilocker/getKycData`,
        method: "POST",
        body: { ...data },
      }),
    }),
  }),
});

export const {
  useKycaddMutation,
  useGetkycDetailsQuery,
  useGetKycDataMutation,
} = kycApiSlice;
