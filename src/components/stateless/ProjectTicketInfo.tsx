import { Paper, Grid, Stack } from "@mui/material";
import PageSection from "./PageSection";
import ProjectTicketIdentity from "./ProjectTicketIdentity";
import ProjectTicketDetails from "./ProjectTicketDetails";
import ProjecTicketAssigned from "./ProjectTicketAssigned";

function ProjectTicketInfo() {
  return (
    <PageSection title="Selected Ticket Information">
      <Paper variant="outlined" sx={{ padding: 2 }}>
        <Grid container spacing={8}>
          <Grid item xs={4}>
            <ProjectTicketIdentity />
          </Grid>
          <Grid item xs={8}>
            <Stack height="100%" direction="column" gap={6}>
              <ProjectTicketDetails />
              <ProjecTicketAssigned />
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </PageSection>
  );
}

export default ProjectTicketInfo;
