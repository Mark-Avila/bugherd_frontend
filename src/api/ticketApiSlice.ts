import { ResponseBody, Ticket, TicketWithUser, User } from "../types";
import { apiSlice } from "./apiSlice";

const ticketApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTicket: builder.mutation({
      query: (data: Ticket) => ({
        method: "POST",
        url: "/ticket",
        body: data,
        credentials: "include",
      }),
    }),
    getTicketByProjectId: builder.query<ResponseBody<TicketWithUser[]>, string>(
      {
        query: (project_id: string) => ({
          url: `/ticket/${project_id}/project`,
          credentials: "include",
        }),
      }
    ),
    getTicketById: builder.query<ResponseBody<Array<Ticket & User>>, string>({
      query: (ticket_id: string) => ({
        url: `/ticket/${ticket_id}`,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateTicketMutation,
  useGetTicketByProjectIdQuery,
  useGetTicketByIdQuery,
  useLazyGetTicketByProjectIdQuery,
} = ticketApiSlice;
