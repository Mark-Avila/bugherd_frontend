import { Box, Divider, Grid, List } from "@mui/material";
import {
  CommentInput,
  CommentItem,
  TicketDetails,
  TicketHeader,
} from "../components";
import PageSection from "../components/stateless/PageSection";
import TicketDescription from "../components/stateless/TicketDescription";
import { useGetTicketByIdQuery } from "../api/ticketApiSlice";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Ticket as TicketType, User } from "../types";
import { useGetCommentsByTicketIdQuery } from "../api/commentApiSlice";
function Ticket() {
  const [ticketData, setTicketData] = useState<(TicketType & User) | null>(
    null
  );

  const { ticket_id } = useParams();
  const ticket = useGetTicketByIdQuery(ticket_id!);
  const comments = useGetCommentsByTicketIdQuery(ticket_id!);

  useEffect(() => {
    if (!ticket.isLoading && ticket.data) {
      setTicketData(ticket.data.data[0]);
    }
  }, [ticket.isLoading]);

  useEffect(() => {
    if (comments.isSuccess) {
      console.log(comments.isSuccess);
    }
  }, [comments.isSuccess]);

  return (
    <Box>
      <Box component="header">
        {ticketData && ticketData.num && (
          <TicketHeader
            issueNumber={ticketData.num.toString()}
            issueProject={ticketData.project_title!.toString()}
            title={ticketData.title}
            author={`${ticketData.fname} ${ticketData.lname}`}
            createdAt="3 days ago"
          />
        )}
      </Box>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={9}>
          <TicketDescription description={ticketData ? ticketData.descr : ""} />
        </Grid>
        <Grid item xs={3}>
          <Box my={2}>
            {ticketData && (
              <TicketDetails
                status={ticketData.status}
                type={ticketData.issue_type}
                time={ticketData.est}
                priority={ticketData.priority}
              />
            )}
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
