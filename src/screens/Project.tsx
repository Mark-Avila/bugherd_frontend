import { Box, Button, Divider, Grid, Pagination } from "@mui/material";
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
import { useGetProjectByIdQuery } from "../api/projectApiSlice";
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
  const [ticketModal, setTicketModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editConfirm, setEditConfirm] = useState(false);
  const [memberModal, setMemberModal] = useState(false);
  const [projectData, setProjectData] = useState<ProjectType | null>(null);
  const toggleTicketModal = () => setTicketModal((prev) => !prev);
  const handleOnClose = () => setTicketModal(false);
  const { project_id } = useParams();
  const navigate = useNavigate();
  const [maxPage, setMaxPage] = useState(0);
  const [currPage, setCurrPage] = useState(1);
  const { enqueueSnackbar } = useSnackbar();
  const { snackbarError } = useSnackError();
  const [tempUser, setTempUser] = useState<User | null>(null);

  const auth = useSelector((state: RootState) => state.auth);
  const project = useGetProjectByIdQuery(project_id!);
  const [getAssigned, assigned] = useLazyGetProjectAssignQuery();
  const [getTickets, tickets] = useLazyGetTicketByProjectIdQuery();
  const [createAssign] = useCreateProjectAssignMutation();

  const TICKET_LIMIT = 5;

  const dispatch = useDispatch();

  useEffect(() => {
    getTickets({ offset: 0, limit: 10, project_id: project_id as string });
  }, []);

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
        navigate("/dashboard");
      }

      setProjectData(project.data.data[0]);
    }
  }, [project.data]);

  useEffect(() => {
    getAssigned(project_id!);
  }, [assigned.data]);

  useEffect(() => {
    const { isError, isLoading, isSuccess } = tickets;

    if (!isError && !isLoading && isSuccess) {
      const pages: number = (tickets.data.count as number) / TICKET_LIMIT;
      setMaxPage(Math.floor(pages));
    }
  }, [tickets]);

  if (
    project.isLoading ||
    project.isError ||
    !project.isSuccess ||
    !projectData
  ) {
    return <LoadingScreen />;
  }

  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
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
    if (tempUser) {
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
      {projectData.id && (
        <EditProjectModal
          title={projectData?.title || "..."}
          description={projectData?.descr || "..."}
          project_id={projectData.id?.toString()}
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
      <ProjectHeader
        title={projectData?.title || "..."}
        desc={projectData?.descr || ""}
        onEditClick={() => handleEditModal(true)}
        archived={projectData?.archived}
      />
      <Divider sx={{ marginY: 4 }} />
      <Grid container spacing={2} component="main">
        <Grid item xs={12} md={6} lg={9}>
          <PageSection
            title="Tickets"
            action={
              <Button
                onClick={toggleTicketModal}
                variant="contained"
                size="small"
                disabled={projectData?.archived}
              >
                New ticket
              </Button>
            }
          >
            {tickets.data && !tickets.isLoading && (
              <TicketList tickets={tickets.data.data} />
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
        <Grid item xs={12} md={6} lg={3}>
          <PageSection
            title="Team"
            action={
              auth.user?.id?.toString() === projectData.user_id?.toString() ||
              auth.user?.role === 2 ? (
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
            {assigned.data && (
              <UserList users={assigned.data.data} lead={projectData.user_id} />
            )}
          </PageSection>
        </Grid>
      </Grid>

      {assigned && assigned.data && project && (
        <NewTicketModal
          open={ticketModal}
          project={project.data.data[0]}
          projectMembers={assigned.data.data}
          onClose={handleOnClose}
          onSuccess={handleOnSuccess}
        />
      )}
    </>
  );
}

export default Project;
