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
import { ChangeEvent, useEffect, useState } from "react";
import { Project, User } from "../types";
import {
  useGetProjectsQuery,
  useUpdateProjectMutation,
} from "../api/projectApiSlice";
import {
  useCreateProjectAssignMutation,
  useDeleteProjectAssignMutation,
  useLazyGetProjectAssignQuery,
} from "../api/projectAssignApiSlice";
import NewMemberModal from "./NewMemberModal";
import { useDebounce, useSnackError } from "../hooks";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useSnackbar } from "notistack";

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
  const { snackbarError } = useSnackError();
  const { enqueueSnackbar } = useSnackbar();
  const [getProjectUsers, projectUsers] = useLazyGetProjectAssignQuery();
  const [updateProject] = useUpdateProjectMutation();
  const [deleteAssign] = useDeleteProjectAssignMutation();
  const [createAssign] = useCreateProjectAssignMutation();
  const [currProjId, setCurrProjId] = useState<string>("");
  const [addMemberModal, setAddMemberModal] = useState(false);
  const [idsToRemove, setIdsToRemove] = useState<number[]>([]);
  const [idsToAdd, setIdsToAdd] = useState<number[]>([]);
  const [currMembers, setCurrMembers] = useState<User[]>([] as User[]);

  const [projectSearch, setProjectSearch] = useState<string>("");

  //Debouce value of projectSearch to reduce search queries
  const debouncedSearch = useDebounce(projectSearch, 500);

  const projects = useGetProjectsQuery({
    title: debouncedSearch,
    limit: 20,
    offset: 0,
  });

  useEffect(() => {
    const { data, isLoading, error, isFetching, isSuccess, isError } =
      projectUsers;

    const isDone = !isFetching && !isLoading;

    if (data && isDone && isSuccess && !isError) {
      setCurrMembers(data.data);
    }

    if (isError && isDone) {
      snackbarError(error as FetchBaseQueryError);
    }
  }, [projectUsers.data]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const { title, description } = values;

      let error_flag = false;

      updateProject({
        project_id: currProjId,
        title: title,
        descr: description,
      })
        .unwrap()
        .catch((err: FetchBaseQueryError) => {
          error_flag = true;
          snackbarError(err);
        });

      if (idsToRemove.length >= 1) {
        idsToRemove.forEach((user_id) => {
          deleteAssign({ user_id: user_id, project_id: parseInt(currProjId) })
            .unwrap()
            .catch((err) => {
              error_flag = true;
              snackbarError(err);
            });
        });
      }

      if (idsToAdd.length >= 1) {
        idsToAdd.forEach((user_id) => {
          createAssign({ user_id: user_id, project_id: parseInt(currProjId) })
            .unwrap()
            .catch((err) => {
              error_flag = true;
              snackbarError(err);
            });
        });
      }

      if (!error_flag) {
        enqueueSnackbar("Successfully Updated Project Information", {
          variant: "success",
        });
      }
    },
  });

  const handleProjectSelect = (project: Project) => {
    if (project.id) {
      setCurrProjId(project.id.toString());
      formik.setValues({
        title: project.title,
        description: project.descr,
      });
      getProjectUsers(project.id.toString());
      setIdsToRemove([]);
      setIdsToAdd([]);
    }
  };

  const handleModalClose = () => {
    setAddMemberModal(false);
  };

  const handleModalOpen = () => {
    setAddMemberModal(true);
  };

  const removeMember = (user: User) => {
    if (user.id) {
      const newArray = currMembers.filter((obj) => obj.id !== user.id);
      setCurrMembers(newArray);

      if (idsToAdd.indexOf(user.id) !== -1) {
        const newIds = idsToAdd.filter((obj) => obj !== user.id);
        setIdsToAdd(newIds);
      }

      // Add to id's to be removed if it is part of the original members before the edit
      if (projectUsers.data?.data.some((obj) => obj["id"] === user.id)) {
        setIdsToRemove((prev) => [...prev, user.id!]);
      }
    }
  };

  const addMember = (user: User) => {
    if (currMembers.some((obj) => obj["id"] === user.id)) {
      enqueueSnackbar("User is already a team member", { variant: "warning" });
      return;
    }

    if (user.id) {
      setCurrMembers((prev) => [...prev, user]);

      if (idsToRemove.indexOf(user.id) !== -1) {
        const newIds = idsToRemove.filter((obj) => obj !== user.id);
        setIdsToRemove(newIds);
      }

      setIdsToAdd((prev) => [...prev, user.id!]);
      handleModalClose();
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProjectSearch(e.target.value);
  };

  return (
    <>
      <NewMemberModal
        open={addMemberModal}
        onClose={handleModalClose}
        onClick={addMember}
      />
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
                <SearchField
                  value={projectSearch}
                  onChange={handleSearchChange}
                  label="Search Project"
                  size="small"
                />
              }
            >
              {projects.isSuccess && !projects.isLoading && projects.data && (
                <Paper
                  variant="outlined"
                  sx={{ maxHeight: 550, overflowY: "auto" }}
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
              {(projects.isLoading || projects.isFetching) && (
                <Stack spacing={1}>
                  {[1, 2, 3, 4, 5].map((item) => (
                    <Skeleton key={item} variant="rounded" height={72} />
                  ))}
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
                    <Button onClick={handleModalOpen}>Add new Member</Button>
                  }
                >
                  <Stack spacing={2}>
                    {!projectUsers.isFetching && projectUsers.data && (
                      <ManageProjectUserList
                        users={currMembers}
                        onItemClick={removeMember}
                      />
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
                      <Button
                        variant="contained"
                        onClick={() => formik.handleSubmit()}
                      >
                        Edit
                      </Button>
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
    </>
  );
}

export default ManageProjects;
