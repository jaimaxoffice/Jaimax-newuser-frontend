// src/features/media/userMediaApiSlice.js
import { apiSlice } from "../../ApiSliceComponent/jaiMaxApi";

export const userMediaApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get active splash image
    getSplashImage: builder.query({
      query: () => ({
        url: "/user/splash", // Backend: GET active splash image
        method: "GET",
      }),
      providesTags: ["SplashImage"],
    }),

    // Get active slider images
    getSliderImages: builder.query({
      query: () => ({
        url: "/user/sliders", // Backend: GET active slider images
        method: "GET",
      }),
      providesTags: ["SliderImages"],
    }),
  }),
});

export const {
  useGetSplashImageQuery,
  useGetSliderImagesQuery,
} = userMediaApiSlice;
