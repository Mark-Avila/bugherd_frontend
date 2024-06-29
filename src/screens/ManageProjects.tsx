import {
  Button,
  Divider,
  Grid,
  List,
  Paper,
  Skeleton,
  Stack,
  Typography,
  useTheme,
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
import { setBreadcrumbs } from "../slices/breadSlice";
import { useDispatch, useSelector } from "react-redux";
import { useCreateNotificationMutation } from "../api/notifApiSlice";
import { RootState } from "../store";

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

/**
 * Screen for updating user details.
 * Only available for users with the role of 'admin'
 */
function ManageProjects() {
  // User authentication state
  const { user } = useSelector((root: RootState) => root.auth);

  // Fetching method and object for users assigned to the project
  const [getProjectUsers, projectUsers] = useLazyGetProjectAssignQuery();

  // Projects data fetching method and object
  const [getProjects, projects] = useLazyGetProjectsQuery();

  // Method or mutation for updating project data
  const [updateProject] = useUpdateProjectMutation();

  // Method or mutation for removing a user assigned to a project
  const [deleteAssign] = useDeleteProjectAssignMutation();

  // Method or mutation for assigning a user to a project
  const [createAssign] = useCreateProjectAssignMutation();

  // Method or mutation for setting the archive status of a project
  const [archiveProject] = useArchiveProjectMutation();

  // State for storing the user's currently selected project
  const [currProj, setCurrProj] = useState<Project | null>(null);

  // Method or mutation for creating or sending notifications
  const [createNotification] = useCreateNotificationMutation();

  // State for storing currently assigned members for the selected project in 'currProj'
  const [currMembers, setCurrMembers] = useState<User[]>([] as User[]);

  // States for storing user ids that an admin plans to removing an assigned user or the opposite
  const [idsToRemove, setIdsToRemove] = useState<number[]>([]);
  const [idsToAdd, setIdsToAdd] = useState<number[]>([]);

  /**
   * State for storing project details before editing.
   * Used to confirm if the admin has changed any details about the project
   */
  const [ogData, setOgData] = useState<{ title: string; description: string }>({
    title: "",
    description: "",
  });

  // State for storing project search field input
  const [projectSearch, setProjectSearch] = useState<string>("");

  // Snackbar hooks
  const { snackbarError } = useSnackError();
  const { enqueueSnackbar } = useSnackbar();

  // State for handling rendering for modals and dialogs
  const [confirmEditDialog, setConfirmEditDialog] = useState(false);
  const [confirmArchDialog, setConfirmArchDialog] = useState(false);
  const [confirmUnarchDialog, setConfirmUnarchDialog] = useState(false);
  const [addMemberModal, setAddMemberModal] = useState(false);

  // MUI theme object
  const theme = useTheme();

  // Debounce hook for applying delay before fetching project data when using search
  const debouncedSearch = useDebounce(projectSearch, 500);

  const dispatch = useDispatch();

  // Fetch projects list data, updates when user types in the search field
  useEffect(() => {
    getProjects({
      title: debouncedSearch,
      limit: 20,
      offset: 0,
    }).unwrap();
  }, [debouncedSearch]);

  // Set breadcrumbs in the navbar on initial load
  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        {
          label: "Dashboard",
          to: "/dashboard",
        },
        {
          label: "Manage Projects",
          to: "/manage/projects",
        },
      ])
    );
  }, []);

  // Error handling assigned users data fetching
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

  // Formik hook for project details edit and assigned members form validation and handling
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

      // Update project with new details
      try {
        await updateProject({
          project_id: projectId,
          title: title,
          descr: description,
        });
      } catch (err: unknown) {
        error_flag = true;
        snackbarError(err as FetchBaseQueryError, "Failed to update project");
      }

      // If there is any set, remove users assigned to the project
      if (idsToRemove.length >= 1) {
        for await (const userId of idsToRemove) {
          try {
            await deleteAssign({
              user_id: userId,
              project_id: parseInt(projectId),
            });
          } catch (err: unknown) {
            error_flag = true;
            snackbarError(
              err as FetchBaseQueryError,
              "Failed to remove a member"
            );
          }
        }
      }

      // If there is any set, assign users to the project
      if (idsToAdd.length >= 1) {
        for await (const userId of idsToAdd) {
          try {
            await createAssign({
              user_id: userId,
              project_id: parseInt(projectId),
            });
          } catch (err: unknown) {
            error_flag = true;
            snackbarError(
              err as FetchBaseQueryError,
              "Failed to add new member"
            );
          }
        }
      }

      // If no errors occured
      if (!error_flag) {
        enqueueSnackbar("Successfully Updated Project Information", {
          variant: "success",
        });

        try {
          // Reload project list data
          await getProjects({
            title: debouncedSearch,
            limit: 20,
            offset: 0,
          });
        } catch (err: unknown) {
          snackbarError(
            err as FetchBaseQueryError,
            "Failed to reload projects data"
          );
        }

        // Create or send a notification for each member assigned to the project
        for await (const member of currMembers) {
          try {
            await createNotification({
              body: "A project you're assigned to has been updated by an administrator",
              to_id: member.id as number,
              from_id: user!.id as number,
              view_path: `/project/${currProj.id}`,
            });
          } catch (err: unknown) {
            error_flag = true;
            snackbarError(
              err as FetchBaseQueryError,
              "Failed to add new member"
            );
          }

          setCurrProj(null);
          setCurrMembers([]);
          setConfirmEditDialog(false);
        }
      }
    },
  });

  // Method for handling selecting a project to update details
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

  // Method for handling removing assigned users (UI side)
  const removeMember = (user: User) => {
    if (user.id) {
      //Remove instance of the user id in the state array
      const newArray = currMembers.filter((obj) => obj.id !== user.id);
      setCurrMembers(newArray);

      // If the user being remove is set in the idsToAdd state, remove it there also
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

  // Method for handling assigning new users to the project (UI side)
  const addMember = (user: User) => {
    if (user.id) {
      // Notify admin if user being added is already in the original members
      if (currMembers.some((obj) => obj["id"] === user.id)) {
        enqueueSnackbar("User is already a team member", {
          variant: "warning",
        });
        return;
      }

      // Add user to the users to be assigned to the project
      setCurrMembers((prev) => [...prev, user]);

      // If user id exists in the idsToRemove state, remove the user
      if (idsToRemove.indexOf(user.id) !== -1) {
        const newIds = idsToRemove.filter((obj) => obj !== user.id);
        setIdsToRemove(newIds);
      }

      // Add user ids to be assigned to the project
      setIdsToAdd((prev) => [...prev, user.id!]);

      // Close modal
      handleModalClose();
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProjectSearch(e.target.value);
  };

  // Method for checking if any information was altered before opening the 'confirm' dialog
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

  // Methods for handling dialog conditional rendering
  const closeEditConfirm = () => setConfirmEditDialog(false);
  const openArchiveConfirm = () => setConfirmArchDialog(true);
  const closeArchiveConfirm = () => setConfirmArchDialog(false);
  const openUnArchiveConfirm = () => setConfirmUnarchDialog(true);
  const closeUnArchiveConfirm = () => setConfirmUnarchDialog(false);

  // Method for setting the archive status of the project
  const handleArchiveProject = async (archive: boolean) => {
    if (!currProj) {
      return;
    }

    // Archive project
    try {
      const response = await archiveProject({
        project_id: currProj.id!.toString(),
        archive: archive,
      }).unwrap();
      if (response.success) {
        enqueueSnackbar("Successfully archived Project", {
          variant: "success",
        });
        closeArchiveConfirm();
        closeUnArchiveConfirm();
        setCurrProj(null);
        setCurrMembers([]);
      }
    } catch (err: unknown) {
      snackbarError(err as FetchBaseQueryError, "Failed to archive project");
    }

    // Reload project data
    try {
      await getProjects({
        title: debouncedSearch,
        limit: 20,
        offset: 0,
      });
    } catch (err: unknown) {
      snackbarError(
        err as FetchBaseQueryError,
        "Failed to reload projects data"
      );
    }
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
                  sx={{
                    maxHeight: 550,
                    overflowY: "auto",
                    backgroundColor: theme.palette.background.paper,
                  }}
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
                <Stack spacing={0.5}>
                  {[1, 2, 3, 4, 5].map((item) => (
                    <Skeleton key={item} variant="rectangular" height={72} />
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
