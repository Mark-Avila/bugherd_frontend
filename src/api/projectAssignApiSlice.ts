import { ProjectAssign } from "../types";
import { apiSlice } from "./apiSlice";

export const projectAssignApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProjectAssign: builder.mutation({
      query: (data: ProjectAssign) => ({
        url: "/project_assign/",
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
  }),
});

export const { useCreateProjectAssignMutation } = projectAssignApiSlice;
