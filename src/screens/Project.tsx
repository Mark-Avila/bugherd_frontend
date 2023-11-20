import { Box, Button, Divider, Grid, Pagination } from "@mui/material";
import {
  ProjectHeader,
  UserList,
  TicketList,
  LoadingScreen,
} from "../components";
import PageSection from "../components/stateless/PageSection";
import { useEffect, useState } from "react";
import NewTicketModal from "./NewTicketModal";
import { useGetProjectByIdQuery } from "../api/projectApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Project as ProjectType } from "../types";
import { useGetProjectAssignQuery } from "../api/projectAssignApiSlice";
import { useGetTicketByProjectIdQuery } from "../api/ticketApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store";

function Project() {
  const [ticketModal, setTicketModal] = useState(false);
  const [projectData, setProjectData] = useState<ProjectType | null>(null);
  const toggleTicketModal = () => setTicketModal((prev) => !prev);
  const handleOnClose = () => setTicketModal(false);
  const { project_id } = useParams();
  const navigate = useNavigate();

  const auth = useSelector((state: RootState) => state.auth);
  const project = useGetProjectByIdQuery(project_id!);
  const assigned = useGetProjectAssignQuery(project_id!);
  const tickets = useGetTicketByProjectIdQuery(project_id!);

  useEffect(() => {
    if (project.data) {
      if (project.data.data.length === 0) {
        navigate("/dashboard");
      }

      setProjectData(project.data.data[0]);
    }
  }, [project.data]);

  if (
    project.isLoading ||
    project.isError ||
    !project.isSuccess ||
    !projectData
  ) {
    return <LoadingScreen />;
  }

  return (
    <>
      <PageSection title={projectData?.title || ""}>
        <ProjectHeader desc={projectData?.descr || ""} />
      </PageSection>

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
              >
                New ticket
              </Button>
            }
          >
            {tickets.data && !tickets.isLoading && (
              <TicketList tickets={tickets.data.data} />
            )}
            <Box mt={2}>
              <Pagination count={10} />
            </Box>
          </PageSection>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <PageSection
            title="Team"
            action={
              auth.user?.id?.toString() === projectData.user_id?.toString() ? (
                <Button variant="contained" size="small">
                  Add member
                </Button>
              ) : (
                <></>
              )
            }
          >
            {assigned.data && <UserList users={assigned.data.data} />}
          </PageSection>
        </Grid>
      </Grid>

      <NewTicketModal
        open={ticketModal}
        project_id={parseInt(project_id!)}
        onClose={handleOnClose}
      />
    </>
  );
}

export default Project;
