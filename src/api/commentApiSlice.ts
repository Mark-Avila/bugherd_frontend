import { Comment } from "../types";
import { apiSlice } from "./apiSlice";

export const commentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCommentsByTicketId: builder.query({
      query: (ticket_id: string) => ({
        url: `/comment/${ticket_id}/ticket`,
        credentials: "include",
      }),
    }),
    createComment: builder.mutation({
      query: (commentData: Comment) => ({
        url: "/comment",
        method: "POST",
        body: commentData,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetCommentsByTicketIdQuery,
  useCreateCommentMutation,
  useLazyGetCommentsByTicketIdQuery,
} = commentApiSlice;
