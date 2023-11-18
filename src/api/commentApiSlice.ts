import { apiSlice } from "./apiSlice";

export const commentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCommentsByTicketId: builder.query({
      query: (ticket_id: string) => ({
        url: `/comment/${ticket_id}/ticket`,
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetCommentsByTicketIdQuery } = commentApiSlice;
