import { Box, Button, Divider, Grid, Toolbar } from "@mui/material";
import {
  ProjectHeader,
  ProjectTeamList,
  ProjectTicketInfo,
  ProjectTicketList,
} from "../components";
import PageSection from "../components/stateless/PageSection";

const DRAWER_WIDTH = 240;

function Projects() {
  return (
    <Box
      component="main"
      sx={{
        width: { xs: "100%", lg: `calc(100% - ${DRAWER_WIDTH}px)` },
        padding: {
          xs: 1,
          md: 3,
        },
        display: "flex",
        flexDirection: "column",
      }}
      aria-label="main-body"
    >
      <Toolbar />
      <ProjectHeader />

      <Divider sx={{ marginY: 4 }} />

      <Grid container spacing={2} component="main">
        <Grid item xs={12} lg={4}>
          <PageSection
            title="Team"
            action={
              <Button
                sx={{
                  marginRight: {
                    xs: 0,
                    lg: 2,
                  },
                }}
                variant="contained"
                size="small"
              >
                Add member
              </Button>
            }
          >
            <ProjectTeamList />
          </PageSection>
        </Grid>
        <Grid item xs={12} lg={8}>
          <PageSection
            title="Tickets"
            action={
              <Button variant="contained" size="small">
                New ticket
              </Button>
            }
          >
            <ProjectTicketList />
          </PageSection>
        </Grid>
      </Grid>

      <Divider sx={{ marginY: 2 }} />
      <PageSection title="Selected Ticket Information">
        <ProjectTicketInfo />
      </PageSection>
    </Box>
  );
}

export default Projects;
