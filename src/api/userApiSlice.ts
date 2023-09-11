import type { ResponseBody, SignInData, SignUpData, User } from "../types";
import { apiSlice } from "./apiSlice";

type UserListResponse = ResponseBody<User[]>;

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (data: SignInData) => ({
        url: "/user/signin",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    signup: builder.mutation({
      query: (data: SignUpData) => ({
        url: "/user/signup",
        method: "POST",
        body: data,
      }),
    }),
    getUsers: builder.query<UserListResponse, void>({
      query: () => ({ url: "/user/all", credentials: "include" }),
    }),
  }),
});

export const { useSigninMutation, useSignupMutation, useGetUsersQuery } =
  userApiSlice;
