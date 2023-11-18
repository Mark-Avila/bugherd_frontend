import { Box, Grid } from "@mui/material";
import { CommentSection, TicketDetails, TicketHeader } from "../components";
import PageSection from "../components/stateless/PageSection";
import TicketDescription from "../components/stateless/TicketDescription";
import { useGetTicketByIdQuery } from "../api/ticketApiSlice";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Comment, Ticket as TicketType, User } from "../types";
import { useGetCommentsByTicketIdQuery } from "../api/commentApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store";

function Ticket() {
  const [ticketData, setTicketData] = useState<(TicketType & User) | null>(
    null
  );
  const [commentsData, setComments] = useState<Comment[]>([]);

  const auth = useSelector((state: RootState) => state.auth);
  const { ticket_id } = useParams();
  const ticket = useGetTicketByIdQuery(ticket_id!);
  const comments = useGetCommentsByTicketIdQuery(ticket_id!);

  useEffect(() => {
    if (!ticket.isLoading && ticket.data) {
      setTicketData(ticket.data.data[0]);
    }
  }, [ticket.isLoading]);

  useEffect(() => {
    if (comments.isSuccess && !comments.isError && !comments.isLoading) {
      setComments(comments.data.data);
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
        {auth.user && auth.user.id && ticketData && (
          <CommentSection
            comments={commentsData}
            user_id={auth.user.id.toString()}
            ticket_id={(ticketData as TicketType).id as string}
          />
        )}
      </PageSection>
    </Box>
  );
}

export default Ticket;
