import { Ticket } from "../types";
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
  }),
});

export const { useCreateTicketMutation } = ticketApiSlice;
