import { Box, Button, Divider, Grid, Pagination } from "@mui/material";
import {
  ProjectHeader,
  UserList,
  TicketList,
  LoadingScreen,
  PageBreadcrumbs,
} from "../components";
import PageSection from "../components/stateless/PageSection";
import { useEffect, useState } from "react";
import NewTicketModal from "./NewTicketModal";
import { useGetProjectByIdQuery } from "../api/projectApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { BreadItem, Project as ProjectType } from "../types";
import { useGetProjectAssignQuery } from "../api/projectAssignApiSlice";
import { useLazyGetTicketByProjectIdQuery } from "../api/ticketApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import EditProjectModal from "./EditProjectModal";

//TODO: Auth check on all submits

function Project() {
  const [ticketModal, setTicketModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [projectData, setProjectData] = useState<ProjectType | null>(null);
  const toggleTicketModal = () => setTicketModal((prev) => !prev);
  const handleOnClose = () => setTicketModal(false);
  const { project_id } = useParams();
  const navigate = useNavigate();
  const [maxPage, setMaxPage] = useState(0);
  const [currPage, setCurrPage] = useState(1);

  const auth = useSelector((state: RootState) => state.auth);
  const project = useGetProjectByIdQuery(project_id!);
  const assigned = useGetProjectAssignQuery(project_id!);
  const [getTickets, tickets] = useLazyGetTicketByProjectIdQuery();
  const TICKET_LIMIT = 5;

  useEffect(() => {
    if (project.data) {
      if (project.data.data.length === 0) {
        navigate("/dashboard");
      }

      setProjectData(project.data.data[0]);
    }
  }, [project.data]);

  useEffect(() => {
    getTickets({ offset: 0, limit: 10, project_id: project_id as string });
  }, []);

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

  const handleModalClose = () => {
    setEditModal(false);
  };

  const handleModalOpen = () => {
    setEditModal(true);
  };

  const handleOnSuccess = () => getTickets({ offset: 0, limit: 10, project_id: project_id as string });

  const breadItems: BreadItem[] = [
    {
      label: "Dashboard",
      to: "/dashboard",
    },
    {
      label: projectData ? projectData.title : "...",
      to: `/project/${projectData.id}`,
    },
  ];

  return (
    <>
      {projectData.id && (
        <EditProjectModal
          title={projectData?.title || "..."}
          description={projectData?.descr || "..."}
          project_id={projectData.id?.toString()}
          open={editModal}
          onClose={handleModalClose}
        />
      )}
      <PageBreadcrumbs items={breadItems} />
      <ProjectHeader
        title={projectData?.title || "..."}
        desc={projectData?.descr || ""}
        onEditClick={handleModalOpen}
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

      <NewTicketModal
        open={ticketModal}
        project_id={parseInt(project_id!)}
        onClose={handleOnClose}
        onSuccess={handleOnSuccess}
      />
    </>
  );
}

export default Project;
