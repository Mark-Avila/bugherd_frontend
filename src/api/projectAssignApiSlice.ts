import { ProjectAssign, ResponseBody, User } from "../types";
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
    getProjectAssign: builder.query<ResponseBody<User[]>, string>({
      query: (project_id: string) => ({
        url: `/project_assign/${project_id}`,
        credentials: "include",
      }),
    }),
  }),
});

export const { useCreateProjectAssignMutation, useGetProjectAssignQuery } =
  projectAssignApiSlice;
