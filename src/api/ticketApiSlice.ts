import { ResponseBody, Ticket, TicketWithUser, User } from "../types";
import { apiSlice } from "./apiSlice";

type Args = { offset?: number; limit?: number };

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
    getTicketByProjectId: builder.query<
      ResponseBody<TicketWithUser[]>,
      { project_id: string } & Args
    >({
      query: (args) => {
        let limit = args.limit;
        let offset = args.offset;

        if (args) {
          limit = args.limit ? args.limit : 10;
          offset = args.offset ? args.offset : 0;
        }

        return {
          url: `/ticket/${args.project_id}/project?offset=${offset}&limit=${limit}`,
          credentials: "include",
        };
      },
    }),
    getTicketsOfCurrentUser: builder.query<
      ResponseBody<TicketWithUser[]>,
      Args | undefined
    >({
      query: (args) => {
        let limit = 10;
        let offset = 0;

        if (args) {
          limit = args.limit ? args.limit : 10;
          offset = args.offset ? args.offset : 0;
        }

        return {
          url: `/ticket/current?offset=${offset}&limit=${limit}`,
          credentials: "include",
        };
      },
    }),
    getTicketById: builder.query<ResponseBody<Array<Ticket & User>>, string>({
      query: (ticket_id: string) => ({
        url: `/ticket/${ticket_id}`,
        credentials: "include",
      }),
    }),
    updateTicket: builder.mutation<
      ResponseBody<unknown>,
      { id: string; data: Ticket }
    >({
      query: (args) => ({
        url: `/ticket/${args.id}`,
        method: "PUT",
        body: args.data,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateTicketMutation,
  useGetTicketByProjectIdQuery,
  useGetTicketByIdQuery,
  useGetTicketsOfCurrentUserQuery,
  useLazyGetTicketByIdQuery,
  useLazyGetTicketByProjectIdQuery,
  useLazyGetTicketsOfCurrentUserQuery,
  useUpdateTicketMutation,
} = ticketApiSlice;
