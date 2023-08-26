import { Paper, Grid, Stack, Divider, List } from "@mui/material";
import PageSection from "./PageSection";
import ProjectTicketIdentity from "./ProjectTicketIdentity";
import ProjectTicketDetails from "./ProjectTicketDetails";
import ProjectTicketAssigned from "./ProjectTicketAssigned";
import TicketCommentItem from "./TicketCommentItem";
import TicketCommentInput from "./TicketCommentInput";

function ProjectTicketInfo() {
  return (
    <Paper variant="outlined" sx={{ padding: 2 }}>
      <Grid container spacing={8}>
        <Grid item xs={12} lg={4}>
          <ProjectTicketIdentity />
        </Grid>
        <Grid item xs={12} lg={8}>
          <Stack height="100%" direction="column" gap={6}>
            <ProjectTicketDetails />
            <ProjectTicketAssigned />
          </Stack>
        </Grid>
      </Grid>
      <Divider sx={{ marginY: 2 }} />
      <PageSection title="Comments">
        <List aria-label="ticket-comments-list">
          <TicketCommentItem />
          <TicketCommentItem />
          <TicketCommentItem />
          <TicketCommentItem />
          <TicketCommentItem />
        </List>
        <Divider />
        <TicketCommentInput />
      </PageSection>
    </Paper>
  );
}

export default ProjectTicketInfo;
