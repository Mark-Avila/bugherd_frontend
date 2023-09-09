import { Project, ResponseBody } from "../types";
import { apiSlice } from "./apiSlice";

export const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentProject: builder.query<ResponseBody<Project[]>, void>({
      query: () => ({ url: "/project/current", credentials: "include" }),
    }),
  }),
});

export const { useGetCurrentProjectQuery } = projectApiSlice;
