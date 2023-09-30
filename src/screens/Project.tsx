import { Box, Button, Divider, Grid, Modal, Pagination } from "@mui/material";
import { ProjectHeader, UserList, TicketList } from "../components";
import PageSection from "../components/stateless/PageSection";
import { useState } from "react";
import NewTicketModal from "./NewTicketModal";

function Project() {
  const [ticketModal, setTicketModal] = useState(false);
  const toggleTicketModal = () => setTicketModal((prev) => !prev);
  const handleOnClose = () => setTicketModal(false);

  return (
    <>
      <PageSection title="Kikoo weather services">
        <ProjectHeader />
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
            <UserList />
          </PageSection>
        </Grid>
      </Grid>

      <Modal
        open={ticketModal}
        onClose={handleOnClose}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            width: {
              xs: "95%",
              lg: 800,
            },
            mx: {
              xs: 1,
            },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
          }}
        >
          <NewTicketModal onClose={toggleTicketModal} />
        </Box>
      </Modal>
    </>
  );
}

export default Project;
