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
import { useParams } from "react-router-dom";
import { Project } from "../types";
import { useGetProjectAssignQuery } from "../api/projectAssignApiSlice";

function Project() {
  const [ticketModal, setTicketModal] = useState(false);
  const [projectData, setProjectData] = useState<Project | null>(null);
  const toggleTicketModal = () => setTicketModal((prev) => !prev);
  const handleOnClose = () => setTicketModal(false);
  const { project_id } = useParams();

  const project = useGetProjectByIdQuery(project_id!);
  const assigned = useGetProjectAssignQuery(project_id!);

  useEffect(() => {
    if (project.data) {
      setProjectData(project.data.data[0]);
    }
  }, [project.data]);

  if (project.isLoading || project.isError) {
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
            <TicketList />
            <Box mt={2}>
              <Pagination count={10} />
            </Box>
          </PageSection>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <PageSection
            title="Team"
            action={
              <Button variant="contained" size="small">
                Add member
              </Button>
            }
          >
            {assigned.data && <UserList users={assigned.data.data} />}
          </PageSection>
        </Grid>
      </Grid>

      <NewTicketModal
        open={ticketModal}
        project_id={1}
        onClose={handleOnClose}
      />
    </>
  );
}

export default Project;
