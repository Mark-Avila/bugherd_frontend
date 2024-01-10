import { Project, ProjectWithUser, ResponseBody } from "../types";
import { apiSlice } from "./apiSlice";

type ProjectListResponse = ResponseBody<Project[] | ProjectWithUser[]>;

type Args = { offset: number; limit: number };

export const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Gets the projects related to the current user
    getCurrentProject: builder.query<ProjectListResponse, Args | void>({
      query: (args) => {
        let limit = 10;
        let offset = 0;

        if (args) {
          limit = args.limit;
          offset = args.offset;
        }

        return {
          url: `/project/current?offset=${offset}&limit=${limit}`,
          credentials: "include",
        };
      },
    }),
    // Gets the all projects
    getProjects: builder.query<ProjectListResponse, Args | void>({
      query: (args) => {
        let limit = 10;
        let offset = 10;

        if (args) {
          limit = args.limit;
          offset = args.offset;
        }

        return {
          url: `/project?offset=${offset}&limit=${limit}`,
          credentials: "include",
        };
      },
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
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useLazyGetCurrentProjectQuery,
  useLazyGetProjectsQuery,
} = projectApiSlice;
