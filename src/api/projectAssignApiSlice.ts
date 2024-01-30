import { Assign, ProjectAssign, ResponseBody } from "../types";
import { apiSlice } from "./apiSlice";

export const projectAssignApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProjectAssign: builder.mutation({
      query: (data: Assign) => ({
        url: "/project_assign/",
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
    deleteProjectAssign: builder.mutation({
      query: (data: Assign) => ({
        url: "/project_assign/",
        method: "DELETE",
        credentials: "include",
        body: data,
      }),
    }),
    getProjectAssign: builder.query<ResponseBody<ProjectAssign[]>, string>({
      query: (project_id: string) => ({
        url: `/project_assign/${project_id}`,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateProjectAssignMutation,
  useLazyGetProjectAssignQuery,
  useGetProjectAssignQuery,
  useDeleteProjectAssignMutation,
} = projectAssignApiSlice;
