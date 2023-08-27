import { Box, Button, Divider, Grid, Modal, Toolbar } from "@mui/material";
import {
  NewTicketModal,
  ProjectHeader,
  ProjectTeamList,
  ProjectTicketInfo,
  ProjectTicketList,
} from "../components";
import PageSection from "../components/stateless/PageSection";
import { useState } from "react";

const DRAWER_WIDTH = 240;

function Projects() {
  const [ticketModal, setTicketModal] = useState(false);

  const toggleTicketModal = () => setTicketModal((prev) => !prev);

  const handleOnClose = () => setTicketModal(false);

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
        <Grid item xs={12} md={6} lg={4}>
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
        <Grid item xs={12} md={6} lg={8}>
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
            <ProjectTicketList />
          </PageSection>
        </Grid>
      </Grid>

      <Divider sx={{ marginY: 2 }} />
      <PageSection title="Selected Ticket Information">
        <ProjectTicketInfo />
      </PageSection>
      <Modal open={ticketModal} onClose={handleOnClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
          }}
        >
          <NewTicketModal onClose={toggleTicketModal} />
        </Box>
      </Modal>
    </Box>
  );
}

export default Projects;
