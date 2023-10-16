import { Box, Divider, Grid, List } from "@mui/material";
import {
  CommentInput,
  CommentItem,
  TicketDetails,
  TicketHeader,
} from "../components";
import PageSection from "../components/stateless/PageSection";
import TicketDescription from "../components/stateless/TicketDescription";
function Ticket() {
  return (
    <Box>
      <Box component="header">
        <TicketHeader
          issueNumber="213"
          issueProject="Kikoo Weather Services"
          title="Can't log in"
          author="Mark Christian Avila"
          createdAt="3 days ago"
        />
      </Box>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={9}>
          <TicketDescription />
        </Grid>
        <Grid item xs={3}>
          <Box my={2}>
            <TicketDetails />
          </Box>
        </Grid>
      </Grid>
      <PageSection title="Comments" marginTop={3}>
        <List aria-label="ticket-comments-list" disablePadding>
          <CommentItem />
          <CommentItem />
          <CommentItem />
          <CommentItem />
          <CommentItem />
        </List>
        <Divider />
        <CommentInput />
      </PageSection>
    </Box>
  );
}

export default Ticket;
