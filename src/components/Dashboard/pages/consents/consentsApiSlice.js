// consentsApiSlice.js
import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi";
import { decryptJson, decryptText } from "./cryptoUtils"; // adjust path

export const consentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConsents: builder.query({
      query: () => ({
        url: "/user/user-consents",
        method: "GET",
      }),
      transformResponse: (response) => {
        // Adjust if your helper.success structure differs
        const { consent, iv, encryptedUsername, encryptedUsernameIv } =
          response.data || response;

        const consentObj = decryptJson(consent, iv);

        let username = null;
        if (encryptedUsername && encryptedUsernameIv) {
          username = decryptText(encryptedUsername, encryptedUsernameIv);
        }

        // Return merged decrypted result
        return {
          ...consentObj,
          username,
        };
      },
      providesTags: ["Consents"],
    }),
  }),
});

export const { useGetConsentsQuery } = consentsApiSlice;