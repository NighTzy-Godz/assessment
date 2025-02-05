import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BASE_URL = import.meta.env.BASE_URL;
// const pause = (duration: number) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, duration);
//   });
// };

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    // This is a function that will acts like a loading state instead of changing the network speed in console
    // fetchFn: async (...args) => {
    //   await pause(3000);
    //   return fetch(...args);
    // },

    baseUrl: `${BASE_URL}/user`,
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => {
        return {
          url: "/register-user",
          method: "POST",
          body: data,
        };
      },
    }),

    loginUser: builder.mutation({
      query: (data) => {
        return {
          url: "/login-user",
          body: data,
          method: "POST",
        };
      },
    }),
  }),
});

export { userApi };
