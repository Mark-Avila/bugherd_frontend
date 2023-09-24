import { Ticket } from "../types";
import { apiSlice } from "./apiSlice";

const ticketApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTicket: builder.mutation({
      query: (data: Ticket) => ({
        method: "POST",
        url: "/ticket",
        credentials: "include",
        data: data,
      }),
    }),
  }),
});

export const { useCreateTicketMutation } = ticketApiSlice;
