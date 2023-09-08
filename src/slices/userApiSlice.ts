import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { SignInData, SignUpData } from "../types";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_ROUTE + "/user",
});

export const userApiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (data: SignInData) => ({
        url: "/signin",
        method: "POST",
        body: data,
      }),
    }),
    signup: builder.mutation({
      query: (data: SignUpData) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSigninMutation, useSignupMutation } = userApiSlice;
