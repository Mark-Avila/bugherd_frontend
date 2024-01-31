import { Project, ProjectWithUser, ResponseBody } from "../types";
import { apiSlice } from "./apiSlice";

type ProjectListResponse = ResponseBody<Project[] | ProjectWithUser[]>;

type Args = { title: string; offset: number; limit: number };

export const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
    getProjects: builder.query<ProjectListResponse, Args | void>({
      query: (args) => {
        let limit = 10;
        let offset = 10;
        let title = "";

        if (args) {
          limit = args.limit;
          offset = args.offset;
          title = args.title;
        }

        return {
          url: `/project?title=${
            title ? title : ""
          }&offset=${offset}&limit=${limit}`,
          credentials: "include",
        };
      },
    }),
    getProjectById: builder.query<ProjectListResponse, string>({
      query: (project_id: string) => ({
        url: "/project/" + project_id,
        credentials: "include",
      }),
    }),
    createProject: builder.mutation({
      query: (data: Project) => ({
        method: "POST",
        url: "/project",
        body: data,
        credentials: "include",
      }),
    }),
    archiveProject: builder.mutation<
      ResponseBody<unknown>,
      { project_id: string; archive: boolean }
    >({
      query: ({ project_id, archive }) => ({
        url: `/project/${project_id}?archive=${archive}`,
        method: "PATCH",
        credentials: "include",
      }),
    }),
    updateProject: builder.mutation<
      ResponseBody<unknown>,
      { project_id: string; title: string; descr: string }
    >({
      query: ({ project_id, title, descr }) => ({
        url: `/project/${project_id}`,
        method: "PUT",
        body: {
          title: title,
          descr: descr,
        },
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
  useUpdateProjectMutation,
  useArchiveProjectMutation,
} = projectApiSlice;
