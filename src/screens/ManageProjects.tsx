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
  ConfirmDialog,
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
  useArchiveProjectMutation,
  useLazyGetProjectsQuery,
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
  const [archiveProject] = useArchiveProjectMutation();
  // const [currProjId, setCurrProjId] = useState<string>("");
  const [currProj, setCurrProj] = useState<Project | null>(null);
  const [addMemberModal, setAddMemberModal] = useState(false);
  const [idsToRemove, setIdsToRemove] = useState<number[]>([]);
  const [idsToAdd, setIdsToAdd] = useState<number[]>([]);
  const [currMembers, setCurrMembers] = useState<User[]>([] as User[]);
  const [ogData, setOgData] = useState<{ title: string; description: string }>({
    title: "",
    description: "",
  });
  const [projectSearch, setProjectSearch] = useState<string>("");
  const [confirmEditDialog, setConfirmEditDialog] = useState(false);
  const [confirmArchDialog, setConfirmArchDialog] = useState(false);
  const [confirmUnarchDialog, setConfirmUnarchDialog] = useState(false);

  //Debouce value of projectSearch to reduce search queries
  const debouncedSearch = useDebounce(projectSearch, 500);

  const [getProjects, projects] = useLazyGetProjectsQuery();

  useEffect(() => {
    getProjects({
      title: debouncedSearch,
      limit: 20,
      offset: 0,
    }).unwrap();
  }, []);

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
      if (!projects.data) {
        return;
      }

      if (!currProj) {
        return;
      }

      const { title, description } = values;

      let error_flag = false;
      const projectId = currProj.id!.toString();

      updateProject({
        project_id: projectId,
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
          deleteAssign({ user_id: user_id, project_id: parseInt(projectId) })
            .unwrap()
            .catch((err) => {
              error_flag = true;
              snackbarError(err);
            });
        });
      }

      if (idsToAdd.length >= 1) {
        idsToAdd.forEach((user_id) => {
          createAssign({ user_id: user_id, project_id: parseInt(projectId) })
            .unwrap()
            .catch((err) => {
              error_flag = true;
              snackbarError(err);
            });
        });
      }

      if (!error_flag) {
        setCurrProj(null);
        setCurrMembers([]);
        setConfirmEditDialog(false);
        enqueueSnackbar("Successfully Updated Project Information", {
          variant: "success",
        });
        getProjects({
          title: debouncedSearch,
          limit: 20,
          offset: 0,
        }).unwrap();
      }
    },
  });

  const handleProjectSelect = (project: Project) => {
    if (project) {
      setCurrProj(project);
      const values = {
        title: project.title,
        description: project.descr,
      };
      formik.setValues(values);
      setOgData(values);
      getProjectUsers(project.id!.toString());
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

  const openEditConfirm = () => {
    const { title, description } = formik.values;

    const isInfoNotUpdated =
      title === ogData.title && description === ogData.description;
    const isMembersNotUpdated =
      idsToRemove.length === 0 && idsToAdd.length === 0;

    if (isInfoNotUpdated && isMembersNotUpdated) {
      enqueueSnackbar("No Information was updated", { variant: "info" });
      return;
    }

    setConfirmEditDialog(true);
  };

  const closeEditConfirm = () => setConfirmEditDialog(false);

  const openArchiveConfirm = () => setConfirmArchDialog(true);
  const closeArchiveConfirm = () => setConfirmArchDialog(false);

  const openUnArchiveConfirm = () => setConfirmUnarchDialog(true);
  const closeUnArchiveConfirm = () => setConfirmUnarchDialog(false);

  const handleArchiveProject = (archive: boolean) => {
    if (!currProj) {
      return;
    }

    archiveProject({
      project_id: currProj.id!.toString(),
      archive: archive,
    })
      .unwrap()
      .then((res) => {
        if (res.success) {
          enqueueSnackbar("Successfully archived Project", {
            variant: "success",
          });
        }
      })
      .finally(() => {
        closeArchiveConfirm();
        closeUnArchiveConfirm();
        setCurrProj(null);
        setCurrMembers([]);
        getProjects({
          title: debouncedSearch,
          limit: 20,
          offset: 0,
        }).unwrap();
      })
      .catch((err: FetchBaseQueryError) => {
        snackbarError(err);
      });
  };

  return (
    <>
      <ConfirmDialog
        open={confirmArchDialog}
        title="Archive Project"
        descr="Are you sure you want to archive this Project?"
        onClose={closeArchiveConfirm}
        onNo={closeArchiveConfirm}
        onYes={() => handleArchiveProject(true)}
      />
      <ConfirmDialog
        open={confirmUnarchDialog}
        title="Unarchive Project"
        descr="Are you sure you want to unarchive this Project?"
        onClose={closeUnArchiveConfirm}
        onNo={closeUnArchiveConfirm}
        onYes={() => handleArchiveProject(false)}
      />
      <ConfirmDialog
        open={confirmEditDialog}
        title="Confirm Changes"
        descr="Are you sure you want to save the changes to this Project?"
        onClose={closeEditConfirm}
        onNo={closeEditConfirm}
        onYes={formik.handleSubmit}
      />
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
          <Grid item xs={12} md={6}>
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
                        id={item.id!}
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
          <Grid item xs={12} md={6}>
            {currProj && (
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
                      {currProj && currProj.archived ? (
                        <Button
                          onClick={openUnArchiveConfirm}
                          variant="outlined"
                          color="warning"
                        >
                          Unarchive Project
                        </Button>
                      ) : (
                        <Button
                          onClick={openArchiveConfirm}
                          variant="outlined"
                          color="warning"
                        >
                          Archive Project
                        </Button>
                      )}
                      <Button variant="contained" onClick={openEditConfirm}>
                        Edit
                      </Button>
                    </Stack>
                  </Stack>
                </PageSection>
              </Stack>
            )}

            {!currProj && (
              <Stack>
                <PageSection title="Project Information">
                  <Typography variant="h3" color="text.disabled">
                    No Project selected
                  </Typography>
                </PageSection>
              </Stack>
            )}
          </Grid>
        </Grid>
      </PageSection>
    </>
  );
}

export default ManageProjects;
