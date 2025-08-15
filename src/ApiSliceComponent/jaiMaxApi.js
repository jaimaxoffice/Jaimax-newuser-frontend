import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  // credentials: "include",

  prepareHeaders: (headers, { getState }) => {
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT,PATCH, DELETE, OPTIONS"
    );

    // const token = localStorage.getItem("token");
    const token = Cookies.get("token");
    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

/**
 * Custom base query to handle token refresh and retry logic.
 */
const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // If a 408 error occurs, try to refresh the token
  if (result?.error?.data?.status_code === 408) {
    const refreshResult = await baseQuery(
      { url: "/Auth/refreshToken", method: "GET" },
      api,
      extraOptions
    );


    if (refreshResult?.data) {
      // Store the new token
      // localStorage.setItem("token", refreshResult.data?.data.token);
      Cookies.set("token", refreshResult.data?.data.token, { expires: 7 });
      // Retry the original query with the new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Token refresh failed
      return refreshResult;
    }
  }

  // If a 401 error occurs, logout or handle it (custom behavior)
  if (result?.error?.data?.status_code === 401) {
    window.location.href = "/login";
    // localStorage.clear();
    Object.keys(Cookies.get()).forEach(function(cookieName) {
  Cookies.remove(cookieName);
});
    // Handle logout or other custom logic
    // console.error("Unauthorized: Logging out");
    // Optionally dispatch an action or navigate the user
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["getComment", "updateDetails", "getTicket", "shareholder"],
  endpoints: (builder) => ({}),
});

export const { usePrefetch } = apiSlice;



// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// // Default base query (Node API on port 3000)
// const baseQuery = fetchBaseQuery({
//   baseUrl: import.meta.env.VITE_API_BASE_URL, // example: http://localhost:3000
//   prepareHeaders: (headers) => {
//     headers.set("Access-Control-Allow-Origin", "*");
//     headers.set(
//       "Access-Control-Allow-Methods",
//       "GET, POST, PUT, PATCH, DELETE, OPTIONS"
//     );

//     const token = localStorage.getItem("token");
//     if (token) {
//       headers.set("authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

// /**
//  * Custom base query to handle token refresh and retry logic
//  * and to dynamically switch base URLs for Python API (port 8000)
//  */
// const baseQueryWithReAuth = async (args, api, extraOptions) => {
//   let modifiedArgs = { ...args };

//   console.log(modifiedArgs , "modifiedArgs")
//   // If request specifies `python: true`, change base URL to Python API
//   if (args?.python) {
//     modifiedArgs = {
//       ...args,
//       url: `${import.meta.env.VITE_API_BASE_URL_PYTHON}${args.url}`, // example: http://localhost:8000
//     };
//   }

//   console.log(args.url , "args.ur")

//   // Use modified args for API request
//   let result = await baseQuery(modifiedArgs, api, extraOptions);
//   console.log(result , "result")

//   // Handle token refresh on 408
//   if (result?.error?.data?.status_code === 408) {
//     const refreshResult = await baseQuery(
//       { url: "/Auth/refreshToken", method: "GET" },
//       api,
//       extraOptions
//     );

//     if (refreshResult?.data) {
//       // Store new token
//       localStorage.setItem("token", refreshResult.data?.data.token);

//       // Retry original request
//       result = await baseQuery(modifiedArgs, api, extraOptions);
//     } else {
//       return refreshResult;
//     }
//   }

//   // Handle logout on 401
//   if (result?.error?.data?.status_code === 401) {
//     localStorage.clear();
//     window.location.href = "/login";
//   }

//   return result;
// };

// // Main API slice
// export const apiSlice = createApi({
//   reducerPath: "apiSlice",
//   baseQuery: baseQueryWithReAuth,
//   tagTypes: ["getComment", "updateDetails", "getTicket", "shareholder"],
//    endpoints: (builder) => ({}),
// });

// export const {
//   usePrefetch,
//   useGetNodeDataQuery,
//   useGetPythonDataQuery,
// } = apiSlice;





