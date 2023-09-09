import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_ROUTE,
});

export const apiSlice = createApi({
  baseQuery,
  endpoints: (_) => ({}),
});
