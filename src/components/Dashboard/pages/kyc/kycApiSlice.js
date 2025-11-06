import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi"; 

export const kycApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    kycadd: builder.mutation({
      query: (data) => {
        return {
          url: "/kyc/submitKyc",
          method: "POST",
          body: data,
        };
      },
    }),
    kycreward: builder.query({
      query: () => {
        return {
          url: "/kyc/kyc-reward-claim",
          method: "GET",
        };
      },
    }),
    getkycDetails: builder.query({
      query: (id) => {
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
    updateBankDetails: builder.mutation({
      query: (data) => ({
        url: "user/update-bank-details",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useKycaddMutation,
  useKycrewardQuery,
  useLazyKycrewardQuery,
  useGetkycDetailsQuery,
  useGetKycDataMutation,
   useUpdateBankDetailsMutation, 
} = kycApiSlice;
