import { Project, ResponseBody } from "../types";
import { apiSlice } from "./apiSlice";

type ProjectListResponse = ResponseBody<Project[]>;

export const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentProject: builder.query<ProjectListResponse, void>({
      query: () => ({ url: "/project/current", credentials: "include" }),
    }),
    getAllProjects: builder.query<ProjectListResponse, void>({
      query: () => "/project",
    }),
    createProject: builder.mutation({
      query: (data: Project) => ({
        method: "POST",
        url: "/project",
        body: data,
      }),
    }),
  }),
});

export const { useGetCurrentProjectQuery, useGetAllProjectsQuery } =
  projectApiSlice;
