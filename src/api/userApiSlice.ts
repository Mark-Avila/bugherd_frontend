import type { SignInData, SignUpData } from "../types";
import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (data: SignInData) => ({
        url: "/user/signin",
        method: "POST",
        body: data,
      }),
    }),
    signup: builder.mutation({
      query: (data: SignUpData) => ({
        url: "/user/signup",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSigninMutation, useSignupMutation } = userApiSlice;
