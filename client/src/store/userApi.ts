import { getStorageItem } from "@/lib/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const pause = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    // This is a function that will acts like a loading state instead of changing the network speed in console
    fetchFn: async (...args) => {
      await pause(3000);
      return fetch(...args);
    },

    baseUrl: `${BASE_URL}/user`,
    prepareHeaders: (headers) => {
      const token = getStorageItem("token");
      if (token) {
        headers.set("x-auth-token", token);
      }
    },
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

    getUserData: builder.query({
      query: () => {
        return {
          url: `/get-user-data`,
          method: "GET",
        };
      },
    }),
  }),
});

export { userApi };
