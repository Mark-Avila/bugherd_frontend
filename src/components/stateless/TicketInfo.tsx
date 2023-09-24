import { Paper, Grid, Stack, Divider, List } from "@mui/material";
import PageSection from "./PageSection";
import TicketIdentity from "./TicketIdentity";
import TicketDetails from "./TicketDetails";
import TicketAssigned from "./TicketAssigned";
import CommentItem from "./CommentItem";
import CommentInput from "./CommentInput";

function TicketInfo() {
  return (
    <Paper variant="outlined" sx={{ padding: 2 }}>
      <Grid container spacing={8}>
        <Grid item xs={12} lg={4}>
          <TicketIdentity />
        </Grid>
        <Grid item xs={12} lg={8}>
          <Stack height="100%" direction="column" gap={6}>
            <TicketDetails />
            <TicketAssigned />
          </Stack>
        </Grid>
      </Grid>
      <Divider sx={{ marginY: 2 }} />
      <PageSection title="Comments">
        <List aria-label="ticket-comments-list">
          <CommentItem />
          <CommentItem />
          <CommentItem />
          <CommentItem />
          <CommentItem />
        </List>
        <Divider />
        <CommentInput />
      </PageSection>
    </Paper>
  );
}

export default TicketInfo;
