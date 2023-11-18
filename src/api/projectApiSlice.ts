import { Project, ProjectWithUser, ResponseBody } from "../types";
import { apiSlice } from "./apiSlice";

type ProjectListResponse = ResponseBody<Project[] | ProjectWithUser[]>;

export const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Gets the projects related to the current user
    getCurrentProject: builder.query<ProjectListResponse, void>({
      query: () => ({ url: "/project/current", credentials: "include" }),
    }),
    // Gets the all projects
    getAllProjects: builder.query<ProjectListResponse, void>({
      query: () => ({ url: "/project", credentials: "include" }),
    }),
    //Get project by ID
    getProjectById: builder.query<ProjectListResponse, string>({
      query: (project_id: string) => ({
        url: "/project/" + project_id,
        credentials: "include",
      }),
    }),
    //Create new project
    createProject: builder.mutation({
      query: (data: Project) => ({
        method: "POST",
        url: "/project",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useGetCurrentProjectQuery,
  useGetAllProjectsQuery,
  useGetProjectByIdQuery,
  useLazyGetCurrentProjectQuery,
} = projectApiSlice;
