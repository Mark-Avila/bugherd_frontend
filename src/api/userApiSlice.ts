import type {
  ResponseBody,
  SignInData,
  SignUpData,
  User,
  UserTicketStats,
} from "../types";
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
    getCurrentTicketStats: builder.query<ResponseBody<UserTicketStats[]>, void>(
      {
        query: () => ({
          url: "/user/stats",
          credentials: "include",
        }),
      }
    ),
    updateUser: builder.mutation({
      query: ({ userId, payload }) => ({
        url: `/user/${userId}`,
        method: "PUT",
        body: payload,
        credentials: "include",
      }),
    }),
    updateUserArchive: builder.mutation({
      query: ({ userId, archive }) => ({
        url: `/user/${userId}/archive?archive=${archive}`,
        method: "PATCH",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useSigninMutation,
  useSignupMutation,
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useUpdateUserMutation,
  useGetCurrentTicketStatsQuery,
  useUpdateUserArchiveMutation,
} = userApiSlice;
