import type { ResponseBody, SignInData, SignUpData, User } from "../types";
import { apiSlice } from "./apiSlice";

interface GetUsersQueries {
  name?: string;
}

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
    getUsers: builder.query<ResponseBody<User[]>, GetUsersQueries>({
      query: (arg) => ({
        url: "/user",
        credentials: "include",
        params: arg,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ userId, payload }) => ({
        url: `/user/${userId}`,
        method: "PUT",
        body: payload,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useSigninMutation,
  useSignupMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} = userApiSlice;
