import {
  Button,
  Divider,
  Grid,
  List,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import PageSection from "../components/stateless/PageSection";
import {
  ManageProjectUserList,
  ManageProjectsForm,
  ManageProjectsItem,
  SearchField,
} from "../components";
import { useFormik } from "formik";
import * as yup from "yup";
import { Add } from "@mui/icons-material";
import { ChangeEvent, useState } from "react";
import { useDebounce } from "../hooks";
import { useGetUsersQuery } from "../api/userApiSlice";
import { Project, User } from "../types";
import { useGetProjectsQuery } from "../api/projectApiSlice";
import { useLazyGetProjectAssignQuery } from "../api/projectAssignApiSlice";

const validationSchema = yup.object({
  title: yup
    .string()
    .min(2, "Title is too short")
    .max(30, "Title is too long")
    .required("Please enter a title"),
  description: yup
    .string()
    .min(2, "Description is too short")
    .required("Please enter a description"),
});

function ManageProjects() {
  // const [projectId, setProjectId] = useState<number | null>(null);
  // const [selectedUser, setSelectedUser] = useState<number | null>(123);
  const [currProjId, setCurrProjId] = useState<string>("");
  const [userSearch, setUserSearch] = useState<string>("");
  const debouncedSearch = useDebounce(userSearch, 500);
  const searchedUsers = useGetUsersQuery({
    name: debouncedSearch,
  });
  const [getProjectUsers, projectUsers] = useLazyGetProjectAssignQuery();
  const projects = useGetProjectsQuery({ limit: 20, offset: 0 });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema,
    onSubmit: () => {},
  });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setUserSearch(e.target.value);
  };

  const handleSearchBlur = () => {
    setUserSearch("");
  };

  const handleProjectSelect = (project: Project) => {
    if (project.id) {
      setCurrProjId(project.id.toString());
      formik.setValues({
        title: project.title,
        description: project.descr,
      });
      getProjectUsers(project.id.toString());
    }
  };

  return (
    <PageSection
      title="Manage Projects"
      primaryTypographyProps={{ fontSize: 32 }}
    >
      <Typography fontSize="small">Modify organization projects</Typography>
      <Divider sx={{ my: 4 }} />
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <PageSection
            title="Projects"
            action={
              <SearchField value="" label="Search Project" size="small" />
            }
          >
            {projects.isSuccess && !projects.isLoading && projects.data && (
              <Paper
                variant="outlined"
                sx={{ maxHeight: 500, overflowY: "auto" }}
              >
                <List disablePadding>
                  {projects.data.data.map((item: Project) => (
                    <ManageProjectsItem
                      key={item.id}
                      title={item.title}
                      descr={
                        item.descr.length >= 60
                          ? item.descr.substring(0, 60) + "..."
                          : item.descr
                      }
                      onClick={() => handleProjectSelect(item)}
                    />
                  ))}
                </List>
              </Paper>
            )}
            {projects.isLoading && (
              <Stack spacing={1}>
                <Skeleton variant="rounded" height={72} />
                <Skeleton variant="rounded" height={72} />
                <Skeleton variant="rounded" height={72} />
                <Skeleton variant="rounded" height={72} />
                <Skeleton variant="rounded" height={72} />
                <Skeleton variant="rounded" height={72} />
              </Stack>
            )}
          </PageSection>
        </Grid>
        <Grid item xs={6}>
          {currProjId && currProjId !== "" && (
            <Stack spacing={2}>
              <PageSection title="Project Information">
                <ManageProjectsForm formik={formik} />
              </PageSection>
              <PageSection
                title="Project Members"
                action={
                  <SearchField
                    value={userSearch}
                    options={searchedUsers.data?.data}
                    withAutoComplete
                    getOptionLabel={(item: unknown) =>
                      `#${(item as User).id} - ${(item as User).fname} ${
                        (item as User).lname
                      }`
                    }
                    size="small"
                    onChange={handleSearch}
                    label="Add new User"
                    icon={<Add />}
                    onBlur={handleSearchBlur}
                  />
                }
              >
                <Stack spacing={2}>
                  {!projectUsers.isFetching && projectUsers.data && (
                    <ManageProjectUserList users={projectUsers.data.data} />
                  )}
                  {projectUsers.isFetching && (
                    <Stack spacing={1}>
                      <Skeleton variant="rounded" height={84} />
                    </Stack>
                  )}
                  <Stack direction="row" justifyContent="space-between">
                    <Button variant="outlined" color="error">
                      Delete Project
                    </Button>
                    <Button variant="contained">Edit</Button>
                  </Stack>
                </Stack>
              </PageSection>
            </Stack>
          )}

          {!currProjId && (
            <Stack>
              <Typography variant="h3" color="text.disabled">
                No Project selected
              </Typography>
            </Stack>
          )}
        </Grid>
      </Grid>
    </PageSection>
  );
}

export default ManageProjects;
