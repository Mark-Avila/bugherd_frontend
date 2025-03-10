import {
  Box,
  Button,
  Divider,
  Grid,
  Pagination,
  Skeleton,
  Stack,
} from "@mui/material";
import {
  ProjectHeader,
  UserList,
  TicketList,
  LoadingScreen,
  ConfirmDialog,
} from "../components";
import PageSection from "../components/stateless/PageSection";
import { useEffect, useState } from "react";
import NewTicketModal from "./NewTicketModal";
import {
  useGetProjectByIdQuery,
  useLazyGetProjectByIdQuery,
} from "../api/projectApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Project as ProjectType, ResponseBody, User } from "../types";
import {
  useCreateProjectAssignMutation,
  useLazyGetProjectAssignQuery,
} from "../api/projectAssignApiSlice";
import { useLazyGetTicketByProjectIdQuery } from "../api/ticketApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import EditProjectModal from "./EditProjectModal";
import NewMemberModal from "./NewMemberModal";
import { useSnackbar } from "notistack";
import { useSnackError } from "../hooks";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { setBreadcrumbs } from "../slices/breadSlice";

//TODO: Auth check on all submits

function Project() {
  //Routing
  const { project_id } = useParams();
  const navigate = useNavigate();

  //Data fetching
  const [getAssigned, assigned] = useLazyGetProjectAssignQuery();
  const [getTickets, tickets] = useLazyGetTicketByProjectIdQuery();
  const [createAssign] = useCreateProjectAssignMutation();
  const project = useGetProjectByIdQuery(project_id!);

  //User authentication
  const auth = useSelector((state: RootState) => state.auth);

  //Data storing
  const [projectData, setProjectData] = useState<ProjectType | null>(null);

  //Snackbars
  const { enqueueSnackbar } = useSnackbar();
  const { snackbarError } = useSnackError();

  //Pagination
  const [maxPage, setMaxPage] = useState(0);
  const [currPage, setCurrPage] = useState(1);
  const [tempUser, setTempUser] = useState<User | null>(null);

  //Loading states
  const [projectLoading, setProjectLoading] = useState(true);
  const [assignedLoading, setAssignedLoading] = useState(true);
  const [ticketLoading, setTicketLoading] = useState(true);

  //Visibility states
  const [ticketModal, setTicketModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editConfirm, setEditConfirm] = useState(false);
  const [memberModal, setMemberModal] = useState(false);

  const toggleTicketModal = () => setTicketModal((prev) => !prev);
  const handleOnClose = () => setTicketModal(false);

  const TICKET_LIMIT = 5;

  const dispatch = useDispatch();

  useEffect(() => {
    if (project.isError) {
      enqueueSnackbar("An error occured while fetching Project data", {
        variant: "error",
      });
      navigate("/dashboard");
    } else {
      getAssigned(project_id!);
      getTickets({ offset: 0, limit: 10, project_id: project_id as string });
    }
  }, [project]);

  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        {
          label: "Dashboard",
          to: "/dashboard",
        },
        {
          label: projectData ? projectData.title : "...",
          to: `/project/${projectData ? projectData.id : "..."}`,
        },
      ])
    );
  }, [projectData]);

  useEffect(() => {
    if (project.data) {
      if (project.data.data.length === 0) {
        enqueueSnackbar("Project data not found", { variant: "error" });
        navigate("/dashboard");
      }

      setProjectData(project.data.data[0]);
    }
  }, [project.data]);

  useEffect(() => {
    const { isError, isLoading, isSuccess } = tickets;

    if (!isError && !isLoading && isSuccess) {
      const pages: number = (tickets.data.count as number) / TICKET_LIMIT;
      setMaxPage(Math.floor(pages));
    }
  }, [tickets]);

  useEffect(() => {
    if (!project.isLoading && !project.isFetching && project.data) {
      setProjectLoading(false);
    }
  }, [project]);

  useEffect(() => {
    if (!tickets.isLoading && !tickets.isFetching && tickets.data) {
      setTicketLoading(false);
    }
  }, [tickets]);

  useEffect(() => {
    if (!assigned.isLoading && !assigned.isFetching && assigned.data) {
      setAssignedLoading(false);
    }
  }, [assigned]);

  const handlePagination = (_: React.ChangeEvent<unknown>, value: number) => {
    if (value <= maxPage && value >= 0 && value !== currPage) {
      setCurrPage(value);
      getTickets({
        offset: (value - 1) * TICKET_LIMIT,
        limit: TICKET_LIMIT,
        project_id: project_id as string,
      });
    }
  };

  const handleEditModal = (mode: boolean) => setEditModal(mode);

  const handleMemberModal = (mode: boolean) => setMemberModal(mode);

  const handleEditConfirm = (mode: boolean) => setEditConfirm(mode);

  const handleAddMemberConfirm = (user: User) => {
    setTempUser(user);
    setEditConfirm(true);
  };

  const handleAddMember = () => {
    if (tempUser && projectData) {
      createAssign({ user_id: tempUser.id!, project_id: projectData.id! })
        .unwrap()
        .then((res: ResponseBody<unknown>) => {
          if (res.success) {
            enqueueSnackbar("Successfully assigned member to project", {
              variant: "success",
            });
          }
        })
        .finally(() => {
          setTempUser(null);
          setEditConfirm(false);
          setMemberModal(false);
        })
        .catch((err: FetchBaseQueryError) => {
          snackbarError(err);
        });
    }
  };

  const handleOnSuccess = () =>
    getTickets({ offset: 0, limit: 10, project_id: project_id as string });

  return (
    <>
      {!projectLoading && (
        <EditProjectModal
          title={projectData?.title || "..."}
          description={projectData!.descr || "..."}
          project_id={projectData!.id!.toString()}
          open={editModal}
          onClose={() => handleEditModal(false)}
        />
      )}
      <ConfirmDialog
        open={editConfirm}
        onClose={() => handleEditConfirm(false)}
        title="Are you sure"
        descr="Are you sure you want to assign this user to this project"
        onNo={() => handleEditConfirm(false)}
        onYes={handleAddMember}
      />
      {assigned.data && (
        <NewMemberModal
          open={memberModal}
          onClose={() => handleMemberModal(false)}
          onClick={handleAddMemberConfirm}
          existingIds={assigned.data.data.map((item) => item.id!)}
        />
      )}
      {projectLoading ? (
        <Stack gap={1}>
          <Skeleton variant="text" width={500} height={50} />
          <Skeleton variant="text" width={700} />
          <Stack direction="row" gap={1}>
            <Skeleton variant="text" width={100} />
            <Skeleton variant="text" width={100} />
          </Stack>
        </Stack>
      ) : (
        <ProjectHeader
          title={projectData?.title || "..."}
          desc={projectData?.descr || ""}
          onEditClick={() => handleEditModal(true)}
          archived={projectData?.archived}
        />
      )}
      <Divider sx={{ marginY: { xs: 2, md: 4 } }} />
      <Grid container spacing={2} component="main" maxWidth={1200}>
        <Grid item xs={12} md={8} lg={9} order={{ xs: 1, md: 0 }}>
          <PageSection
            title="Tickets"
            action={
              ticketLoading ? (
                <></>
              ) : (
                <Button
                  onClick={toggleTicketModal}
                  variant="contained"
                  size="small"
                  disabled={projectData?.archived}
                >
                  New ticket
                </Button>
              )
            }
          >
            {ticketLoading ? (
              <Skeleton variant="rounded" height={300} width="100%" />
            ) : (
              <TicketList tickets={tickets.data!.data} />
            )}
            {maxPage > 1 && (
              <Box mt={2}>
                <Pagination
                  count={maxPage}
                  page={currPage}
                  onChange={handlePagination}
                />
              </Box>
            )}
          </PageSection>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          {projectLoading ? (
            <PageSection title="Team">
              <Skeleton width="100%" height={200} variant="rounded" />
            </PageSection>
          ) : (
            <PageSection
              title="Team"
              action={
                auth.user?.id?.toString() ===
                  projectData!.user_id?.toString() || auth.user?.role === 2 ? (
                  <Button
                    variant="contained"
                    size="small"
                    disabled={projectData?.archived}
                    onClick={() => handleMemberModal(true)}
                  >
                    Add member
                  </Button>
                ) : (
                  <></>
                )
              }
            >
              {assignedLoading ? (
                <></>
              ) : (
                assigned.data && (
                  <UserList
                    users={assigned.data.data}
                    lead={projectData!.user_id}
                  />
                )
              )}
            </PageSection>
          )}
        </Grid>
      </Grid>

      {!assignedLoading && !projectLoading && (
        <NewTicketModal
          open={ticketModal}
          project={project.data!.data[0]}
          projectMembers={assigned.data!.data}
          onClose={handleOnClose}
          onSuccess={handleOnSuccess}
        />
      )}
    </>
  );
}

export default Project;
